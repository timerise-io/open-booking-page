import parseISO from "date-fns/parseISO";
import format from "date-fns-tz/format";

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
