import parseISO from "date-fns/parseISO";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

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
  locale
}: {
  date: string,
  sourceTimeZone: string,
  targetTimeZone: string,
  dateFormat?: string,
  locale?: Locale,
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
