import React, { useEffect, useMemo } from "react";
import InfoBox from "components/InfoBox";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import useDimensions from "react-cool-dimensions";
import { useTranslation } from "react-i18next";
import { useSlotsViewConfiguration } from "features/service/hooks/useSlotsViewConfiguration";
import { usePageDates } from "state/hooks";
import { useBookingStore, useFilterStore } from "state/stores";
import styled from "styled-components";
import ServiceCalendarDay from "./ServiceCalendarDay";

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
  const days = usePageDates();
  const noTimeSlots = useBookingStore((state) => state.serviceSlots).length === 0;
  const serviceCalendarFilters = useFilterStore((state) => state.slotsFilters);
  const setServiceCalendarFilters = useFilterStore((state) => state.setSlotsFilters);
  const { t } = useTranslation();
  const slotsViewConfig = useSlotsViewConfiguration();
  const pageSize = Math.min(slotsViewConfig.maxDaysPerPage, Math.trunc(width / slotsViewConfig.slotsColumnWidth));
  const daysToRender = useMemo(
    () => days.slice(0, pageSize === 0 ? slotsViewConfig.minDaysPerPage : pageSize),
    [days, pageSize, slotsViewConfig.minDaysPerPage],
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
      {noTimeSlots && <InfoBox>{t("no-time-slots-available")}</InfoBox>}
    </Wrapper>
  );
};

export default ServiceCalendarWrapper;
