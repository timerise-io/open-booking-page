import React, { useMemo } from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { formatInTimeZone } from "date-fns-tz";
import { useLocale } from "helpers/hooks/useLocale";
import { useRecoilValue } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import { slotsDayPattern } from "state/selectors/slotsDayPattern";
import styled from "styled-components";
import { HOURS_SYSTEMS } from "../../HoursSystem/enums/HoursSystem.enum";
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
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);

  return (
    <ServiceCalendarDayWrapper>
      <Box mb={1.5}>
        <Typography typographyType="body" weight="bold" as="div" align="center">
          {formatInTimeZone(day, "UTC", "iii", {
            locale: locale,
          }).replace(/[.]$/, "")}
        </Typography>
        <DateTypography className="date-text" typographyType="body" as="div" align="center">
          {formatInTimeZone(day, "UTC", "dd MMM", {
            locale: locale,
          })}
        </DateTypography>
      </Box>

      {pattern.map((item) => {
        return (
          <TimeSlot
            key={`${dayPart}-${item.key}`}
            dateFrom={`${dayPart}T${item.from}`}
            dateTo={`${dayPart}T${item.to}`}
            is12HoursSystem={is12HoursSystem}
          />
        );
      })}
    </ServiceCalendarDayWrapper>
  );
};

export default ServiceCalendarDay;
