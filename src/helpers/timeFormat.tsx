import React from "react";
import { Locale, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { stripTimezoneFromISO } from "helpers/functions";
import styled from "styled-components";

export function getDateInTimezone(isoDate: string): Date {
  return parseISO(stripTimezoneFromISO(isoDate));
}

interface ConvertDateTimeParams {
  date: string;
  targetTimeZone: string;
  dateFormat?: string;
  locale?: Locale;
}

export function convertSourceDateTimeToTargetDateTime({
  date,
  targetTimeZone,
  dateFormat = "H:mm",
  locale,
}: ConvertDateTimeParams): string {
  return formatInTimeZone(new Date(date), targetTimeZone, dateFormat, { locale });
}

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;

  small {
    font-size: 9px;
    text-transform: lowercase;
    line-height: 7px;
  }
`;

interface ConvertDateTimeWithHoursSystemParams {
  date: string;
  targetTimeZone: string;
  locale?: Locale;
  is12HoursSystem?: boolean;
}

export function convertSourceDateTimeToTargetDateTimeWithHoursSystem({
  date,
  targetTimeZone,
  locale,
  is12HoursSystem,
}: ConvertDateTimeWithHoursSystemParams): React.JSX.Element {
  const utcDate = new Date(date);
  const timeFormat = is12HoursSystem ? "h:mm" : "H:mm";

  return (
    <Wrapper>
      {formatInTimeZone(utcDate, targetTimeZone, timeFormat, { locale })}
      {is12HoursSystem && <small>{formatInTimeZone(utcDate, targetTimeZone, "a", { locale })}</small>}
    </Wrapper>
  );
}
