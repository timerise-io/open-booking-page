import { Row } from "components/layout/Row";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pageDates } from "state/selectors/pageDates";
import ServiceCalendarDay from "./ServiceCalendarDay";
import styled from "styled-components";
import useDimensions from "react-cool-dimensions";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import InfoBox from "components/InfoBox";
import { Column } from "components/layout/Column";
import { serviceSlotsAtom } from "state/atoms/serviceSlots";
import { useTranslation } from "react-i18next";
import { slotsViewConfiguration } from "state/selectors/slotsViewConfiguration";

const DaysRow = styled(Row)`
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  justify-content: center;
`;

const Wrapper = styled(Column)`
  width: 100%;
`;

const ServiceCalendarWrapper = () => {
  const { observe, width } = useDimensions();
  const days = useRecoilValue(pageDates);
  const noTimeSlots = useRecoilValue(serviceSlotsAtom).length === 0;
  const [serviceCalendarFilters, setServiceCalendarFilters] =
    useRecoilState(slotsFiltersAtom);
  const { t } = useTranslation();
  const slotsViewConfig = useRecoilValue(slotsViewConfiguration);

  const pageSize = Math.min(
    slotsViewConfig.maxDaysPerPage,
    Math.trunc(width / slotsViewConfig.slotsColumnWidth)
  );
  const daysToRender = days.slice(
    0,
    pageSize === 0 ? slotsViewConfig.minDaysPerPage : pageSize
  );

  useEffect(() => {
    if (pageSize !== serviceCalendarFilters.pageSize)
      setServiceCalendarFilters({
        ...serviceCalendarFilters,
        pageSize,
      });
  }, [pageSize, serviceCalendarFilters, setServiceCalendarFilters]);

  return (
    <Wrapper>
      <DaysRow ref={observe}>
        {daysToRender.map((day) => {
          return <ServiceCalendarDay key={day} day={day} />;
        })}
      </DaysRow>
      {noTimeSlots && (
        <InfoBox>{t("no-time-slots-available")}</InfoBox>
      )}
    </Wrapper>
  );
};

export default ServiceCalendarWrapper;
