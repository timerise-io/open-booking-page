import React from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import { slotsDayPattern } from "state/selectors/slotsDayPattern";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";

const ServiceCalendarDayWrapper = styled(Column)`
  min-width: 56px;
  flex: 1;
  margin: 0 8px;
`;

const DateTypography = styled(Typography)`
  max-width: 60px;
  min-height: 40px;
`;

interface ServiceCalendarDayProps {
  day: string;
}

const ServiceCalendarDay: React.FC<ServiceCalendarDayProps> = ({ day }) => {
  const locale = useLocale();
  const dayPart = day.split("T")[0];
  const pattern = useRecoilValue(slotsDayPattern);
  const timeZone = useRecoilValue(timeZoneAtom);
  const service = useRecoilValue(serviceAtom)!;

  return (
    <ServiceCalendarDayWrapper>
      <Box mb={1.5}>
        <Typography typographyType="body" weight="bold" as="div" align="center">
          {convertSourceDateTimeToTargetDateTime({
            date: day,
            targetTimeZone: timeZone,
            sourceTimeZone: service.project.localTimeZone,
            dateFormat: "iii",
            locale,
          }).replace(/[.]$/, "")}
        </Typography>
        <DateTypography className="date-text" typographyType="body" as="div" align="center">
          {convertSourceDateTimeToTargetDateTime({
            date: day,
            targetTimeZone: timeZone,
            sourceTimeZone: service.project.localTimeZone,
            dateFormat: "dd MMM",
            locale,
          })}
        </DateTypography>
      </Box>

      {pattern.map((item) => {
        return (
          <TimeSlot
            key={`${dayPart}-${item.key}`}
            dateFrom={`${dayPart}T${item.from}`}
            dateTo={`${dayPart}T${item.to}`}
            day={day}
          />
        );
      })}
    </ServiceCalendarDayWrapper>
  );
};

export default ServiceCalendarDay;
