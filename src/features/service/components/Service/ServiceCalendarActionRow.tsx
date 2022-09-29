import styled from "styled-components";
import { IconButton } from "components/IconButton";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { Row } from "components/layout/Row";
import { useRecoilState, useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import TimezoneInfo from "./TimezoneInfo";
import { addDays, addMinutes, isAfter, isSameDay, set } from "date-fns/esm";
import isBefore from "date-fns/isBefore";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const Loader = (
  <Wrapper>
    <SkeletonBox h="20px" w="100%" />
    <Row>
      <IconButton disabled>
        <IconChevronLeft />
      </IconButton>
      <IconButton disabled>
        <IconChevronRight />
      </IconButton>
    </Row>
  </Wrapper>
);

const ServiceCalendarActionRow = () => {
  const service = useRecoilValue(serviceAtom);
  const [serviceFilters, setServiceFilters] = useRecoilState(slotsFiltersAtom);

  if (service === undefined) {
    return Loader;
  }

  const pageEnd = addDays(
    new Date(serviceFilters.firstDayDate),
    serviceFilters.pageSize
  );

  const pageEndToCompare = addMinutes(
    set(new Date(serviceFilters.firstDayDate), {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }),
    serviceFilters.pageSize * 24 * 60 - 1
  );

  const isPrevDisabled =
    isBefore(
      new Date(serviceFilters.firstDayDate),
      new Date(service.dateTimeFrom)
    ) ||
    isSameDay(
      new Date(serviceFilters.firstDayDate),
      new Date(service.dateTimeFrom)
    ) ||
    isSameDay(new Date(), new Date(serviceFilters.firstDayDate)) ||
    isAfter(new Date(), new Date(serviceFilters.firstDayDate));

  const isNextDisabled =
    isSameDay(pageEndToCompare, new Date(service.dateTimeTo)) ||
    isAfter(pageEndToCompare, new Date(service.dateTimeTo));

  const handlePrevClick = () => {
    const firstDayDate = addDays(
      new Date(serviceFilters.firstDayDate),
      serviceFilters.pageSize * -1
    );

    setServiceFilters({
      ...serviceFilters,
      fetchDate: firstDayDate.toISOString(),
    });
  };

  const handleNextClick = () => {
    setServiceFilters({ ...serviceFilters, fetchDate: pageEnd.toISOString() });
  };

  return (
    <Wrapper>
      <Row>
        <IconButton disabled={isPrevDisabled} onClick={handlePrevClick}>
          <IconChevronLeft />
        </IconButton>
        <IconButton disabled={isNextDisabled} onClick={handleNextClick}>
          <IconChevronRight />
        </IconButton>
      </Row>
      <TimezoneInfo />
    </Wrapper>
  );
};

export default ServiceCalendarActionRow;
