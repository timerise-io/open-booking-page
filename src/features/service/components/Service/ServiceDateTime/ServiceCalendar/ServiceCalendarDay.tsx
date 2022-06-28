import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Typography } from "components/Typography";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";
import { slotsDayPattern } from "state/selectors/slotsDayPattern";
import { useLocale } from "helpers/hooks/useLocale";
import { formatInTimeZone } from "date-fns-tz";

const ServiceCalendarDayWrapper = styled(Column)`
  min-width: 56px;
  flex: 1;
  margin: 0 8px;
`;

interface ServiceCalendarDayProps {
  day: string;
}

const ServiceCalendarDay: React.FC<ServiceCalendarDayProps> = ({ day }) => {
  const locale = useLocale();
  const dayPart = day.split("T")[0];

  const pattern = useRecoilValue(slotsDayPattern);

  return (
    <ServiceCalendarDayWrapper>
      <Box mb={1.5}>
        <Typography typographyType="body" weight="bold" as="div" align="center">
          {formatInTimeZone(day, "UTC", "iii", {
            locale: locale,
          }).replace(/[.]$/, "")}
        </Typography>
        <Typography typographyType="body" as="div" align="center">
          {formatInTimeZone(day, "UTC", "dd MMM", {
            locale: locale,
          })}
        </Typography>
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
