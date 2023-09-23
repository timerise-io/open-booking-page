import { ContextButton } from "components/ContextButton";
import { Row } from "components/layout/Row";
import { addMonths } from "date-fns";
import { addDays, addMinutes, isAfter, isSameDay, set } from "date-fns/esm";
import isBefore from "date-fns/isBefore";
import { useRecoilState, useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import styled, { css } from "styled-components";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  margin-top: 12px;
`;

const PaginationButton = styled(ContextButton)`
  padding: 0;
  height: 36px;
  width: 36px;
  display: grid;
  border: none;

  &:hover {
    border: none;
    background: ${({ theme, disabled }) =>
      disabled ? "transparent" : theme.colorSchemas.timeSlotButton.available.background};
  }
  & > * {
    margin: auto;
    ${({ theme, disabled }) => {
      if (!disabled) return "";

      return css`
        color: ${theme.colorSchemas.contextButton.disabledText};
      `;
    }}
  }
`;

const Loader = <Wrapper></Wrapper>;

const ServiceCalendarActionRow = () => {
  const service = useRecoilValue(serviceAtom);
  const [serviceFilters, setServiceFilters] = useRecoilState(slotsFiltersAtom);

  if (service === undefined) {
    return Loader;
  }

  const pageEnd = addDays(new Date(serviceFilters.firstDayDate), serviceFilters.pageSize);

  const pageEndToCompare = addMinutes(
    set(new Date(serviceFilters.firstDayDate), {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }),
    serviceFilters.pageSize * 24 * 60 - 1,
  );

  const isPrevDisabled =
    isBefore(new Date(serviceFilters.firstDayDate), new Date(service.dateTimeFrom)) ||
    isSameDay(new Date(serviceFilters.firstDayDate), new Date(service.dateTimeFrom)) ||
    isSameDay(new Date(), new Date(serviceFilters.firstDayDate)) ||
    isAfter(new Date(), new Date(serviceFilters.firstDayDate));

  const isPrevMonthDisabled = isPrevDisabled;

  const isNextDisabled =
    isSameDay(pageEndToCompare, new Date(service.dateTimeTo)) ||
    isAfter(pageEndToCompare, new Date(service.dateTimeTo));

  const isNextMonthDisabled = isNextDisabled;

  const handlePrevClick = () => {
    const firstDayDate = addDays(new Date(serviceFilters.firstDayDate), serviceFilters.pageSize * -1);

    setServiceFilters({
      ...serviceFilters,
      fetchDate: firstDayDate.toISOString(),
    });
  };

  const handlePrevMonthClick = () => {
    const prevMonth = addMonths(set(new Date(serviceFilters.firstDayDate), { date: 1 }), -1);
    const firstDayDate = isBefore(prevMonth, new Date(service.dateTimeFrom))
      ? new Date(service.dateTimeFrom)
      : prevMonth;

    setServiceFilters({
      ...serviceFilters,
      fetchDate: firstDayDate.toISOString(),
    });
  };

  const handleNextClick = () => {
    setServiceFilters({ ...serviceFilters, fetchDate: pageEnd.toISOString() });
  };

  const handleNextMonthClick = () => {
    const nextMonth = addMonths(set(new Date(serviceFilters.firstDayDate), { date: 1 }), 1);

    const firstDayDate = isAfter(nextMonth, new Date(service.dateTimeTo)) ? new Date(service.dateTimeTo) : nextMonth;

    setServiceFilters({
      ...serviceFilters,
      fetchDate: firstDayDate.toISOString(),
    });
  };

  return (
    <Wrapper>
      <Row gap="8px">
        <PaginationButton colorType="primary" onClick={handlePrevMonthClick} disabled={isPrevMonthDisabled}>
          <IconChevronsLeft />
        </PaginationButton>
        <PaginationButton colorType="primary" onClick={handlePrevClick} disabled={isPrevDisabled}>
          <IconChevronLeft />
        </PaginationButton>
      </Row>
      <Row gap="8px">
        <PaginationButton colorType="primary" onClick={handleNextClick} disabled={isNextDisabled}>
          <IconChevronRight />
        </PaginationButton>
        <PaginationButton colorType="primary" onClick={handleNextMonthClick} disabled={isNextMonthDisabled}>
          <IconChevronsRight />
        </PaginationButton>
      </Row>
    </Wrapper>
  );
};

export default ServiceCalendarActionRow;
