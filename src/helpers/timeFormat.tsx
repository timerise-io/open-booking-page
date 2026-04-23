import React from "react";
import { Locale, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { stripTimezoneFromISO } from "helpers/functions";
import styled from "styled-components";

export function getDateInTimezone(isoDate: string): Date {
  return parseISO(stripTimezoneFromISO(isoDate));
}

export function formatInTimezone(isoDate: string, dateFormat: string): string {
  return formatInTimeZone(getDateInTimezone(isoDate), "UTC", dateFormat);
}

interface ConvertDateTimeParams {
  date: string;
  sourceTimeZone: string;
  targetTimeZone: string;
  locale?: Locale;
}

function toTargetDate(date: string, targetTimeZone: string): Date {
  return toZonedTime(new Date(date), targetTimeZone);
}

export function convertSourceDateTimeToTargetDateTime({
  date,
  targetTimeZone,
  dateFormat,
  locale,
}: ConvertDateTimeParams & { dateFormat?: string }): string {
  const targetDate = toTargetDate(date, targetTimeZone);

  return formatInTimeZone(targetDate, targetTimeZone, dateFormat ?? "H:mm", { locale });
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

export function convertSourceDateTimeToTargetDateTimeWithHoursSystem({
  date,
  targetTimeZone,
  locale,
  is12HoursSystem,
}: ConvertDateTimeParams & { is12HoursSystem?: boolean }): React.JSX.Element {
  const targetDate = toTargetDate(date, targetTimeZone);

  return (
    <Wrapper>
      {formatInTimeZone(targetDate, targetTimeZone, is12HoursSystem ? "h:mm" : "H:mm", { locale })}
      {is12HoursSystem && <small>{formatInTimeZone(targetDate, targetTimeZone, "a", { locale })}</small>}
    </Wrapper>
  );
}
