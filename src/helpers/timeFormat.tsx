import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import styled from "styled-components";

export const getDateInTimezone = (isoDate: string) => {
  const dateToFormat = parseISO(isoDate.split("Z")[0]);

  return dateToFormat;
};

export const formatInTimezone = (isoDate: string, dateFormat: string) => {
  const dateToFormat = getDateInTimezone(isoDate);

  return format(dateToFormat, dateFormat, {
    timeZone: "UTC",
  });
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
  const utcDate = zonedTimeToUtc(sourceDate, sourceTimeZone);
  const targetDate = utcToZonedTime(utcDate, targetTimeZone);

  return format(targetDate, dateFormat ?? "H:mm", { timeZone: targetTimeZone, locale });
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
}) => JSX.Element;

export const convertSourceDateTimeToTargetDateTimeWithHoursSystem: ConvertSourceDateTimeToTargetDateTimeWithHoursSystem =
  ({ date, sourceTimeZone, targetTimeZone, locale, is12HoursSystem }) => {
    const sourceDate = new Date(date.slice(0, -5));
    const utcDate = zonedTimeToUtc(sourceDate, sourceTimeZone);
    const targetDate = utcToZonedTime(utcDate, targetTimeZone);

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

    return (
      <Wrapper>
        {format(targetDate, is12HoursSystem ? "h:mm" : "H:mm", { timeZone: targetTimeZone, locale })}
        {is12HoursSystem && <small>{format(targetDate, "a", { timeZone: targetTimeZone, locale })}</small>}
      </Wrapper>
    );
  };
