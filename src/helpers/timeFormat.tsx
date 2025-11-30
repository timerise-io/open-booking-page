import { formatInTimeZone, toZonedTime, fromZonedTime } from "date-fns-tz";
import { parseISO, Locale } from "date-fns";
import React from "react";
import styled from "styled-components";

export const getDateInTimezone = (isoDate: string) => {
  const dateToFormat = parseISO(isoDate.split("Z")[0]);

  return dateToFormat;
};

export const formatInTimezone = (isoDate: string, dateFormat: string) => {
  const dateToFormat = getDateInTimezone(isoDate);

  return formatInTimeZone(dateToFormat, "UTC", dateFormat);
};

type ConvertSourceDateTimeToTargetDateTime = ({
  date,
  sourceTimeZone,
  targetTimeZone,
  dateFormat,
  locale,
}: {
  date: string;
  sourceTimeZone: string;
  targetTimeZone: string;
  dateFormat?: string;
  locale?: Locale;
}) => string;

export const convertSourceDateTimeToTargetDateTime: ConvertSourceDateTimeToTargetDateTime = ({
  date,
  sourceTimeZone,
  targetTimeZone,
  dateFormat,
  locale,
}) => {
  const sourceDate = new Date(date.slice(0, -5));
  const utcDate = fromZonedTime(sourceDate, sourceTimeZone);
  const targetDate = toZonedTime(utcDate, targetTimeZone);

  return formatInTimeZone(targetDate, targetTimeZone, dateFormat ?? "H:mm", { locale });
};

type ConvertSourceDateTimeToTargetDateTimeWithHoursSystem = ({
  date,
  sourceTimeZone,
  targetTimeZone,
  locale,
  is12HoursSystem,
}: {
  date: string;
  sourceTimeZone: string;
  targetTimeZone: string;
  locale?: Locale;
  is12HoursSystem?: boolean;
}) => React.JSX.Element;

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

export const convertSourceDateTimeToTargetDateTimeWithHoursSystem: ConvertSourceDateTimeToTargetDateTimeWithHoursSystem =
  ({ date, sourceTimeZone, targetTimeZone, locale, is12HoursSystem }) => {
    const sourceDate = new Date(date.slice(0, -5));
    const utcDate = fromZonedTime(sourceDate, sourceTimeZone);
    const targetDate = toZonedTime(utcDate, targetTimeZone);

    return (
      <Wrapper>
        {formatInTimeZone(targetDate, targetTimeZone, is12HoursSystem ? "h:mm" : "H:mm", { locale })}
        {is12HoursSystem && <small>{formatInTimeZone(targetDate, targetTimeZone, "a", { locale })}</small>}
      </Wrapper>
    );
  };
