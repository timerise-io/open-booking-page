import React from "react";
import { Locale, parseISO } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { stripTimezoneFromISO } from "helpers/functions";
import styled from "styled-components";

export function getDateInTimezone(isoDate: string): Date {
  return parseISO(stripTimezoneFromISO(isoDate));
}

// Timerise API returns the `DateTime` scalar as wall-clock time in
// service.project.localTimeZone with a literal "Z" suffix, despite the schema
// description claiming UTC. Strip the misleading Z, reinterpret the wall-clock
// as an instant in sourceTimeZone, then format that instant in targetTimeZone.
function toUtcInstant(date: string, sourceTimeZone: string): Date {
  return fromZonedTime(stripTimezoneFromISO(date), sourceTimeZone);
}

interface ConvertDateTimeParams {
  date: string;
  sourceTimeZone: string;
  targetTimeZone: string;
  dateFormat?: string;
  locale?: Locale;
}

export function convertSourceDateTimeToTargetDateTime({
  date,
  sourceTimeZone,
  targetTimeZone,
  dateFormat = "H:mm",
  locale,
}: ConvertDateTimeParams): string {
  return formatInTimeZone(toUtcInstant(date, sourceTimeZone), targetTimeZone, dateFormat, { locale });
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
  sourceTimeZone: string;
  targetTimeZone: string;
  locale?: Locale;
  is12HoursSystem?: boolean;
}

export function convertSourceDateTimeToTargetDateTimeWithHoursSystem({
  date,
  sourceTimeZone,
  targetTimeZone,
  locale,
  is12HoursSystem,
}: ConvertDateTimeWithHoursSystemParams): React.JSX.Element {
  const utcInstant = toUtcInstant(date, sourceTimeZone);
  const timeFormat = is12HoursSystem ? "h:mm" : "H:mm";

  return (
    <Wrapper>
      {formatInTimeZone(utcInstant, targetTimeZone, timeFormat, { locale })}
      {is12HoursSystem && <small>{formatInTimeZone(utcInstant, targetTimeZone, "a", { locale })}</small>}
    </Wrapper>
  );
}
