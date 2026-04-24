import { Locale } from "date-fns";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { BOOKING_FORM_TYPES, Service } from "models/service";

type GetDatesValue = ({
  service,
  dateTimeFrom,
  dateTimeTo,
  targetTimeZone,
  locale,
  is12HoursSystem,
}: {
  service: Service;
  dateTimeFrom: string;
  dateTimeTo: string;
  targetTimeZone: string;
  locale: Locale;
  is12HoursSystem: boolean;
}) => string;

const getDaysDatesValue: GetDatesValue = ({ dateTimeFrom, targetTimeZone, locale, is12HoursSystem }) => {
  const dateFormat = is12HoursSystem ? "iiii dd MMM yyyy, h:mm a" : "iiii dd MMM yyyy, H:mm";

  return convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    dateFormat,
    locale,
  });
};

const getCalendarDatesValue: GetDatesValue = ({ dateTimeFrom, dateTimeTo, targetTimeZone, locale }) => {
  const dateFromWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const dateToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  if (dateFromWithTimezone === dateToWithTimezone) {
    return dateFromWithTimezone;
  }

  return `${dateFromWithTimezone} - ${dateToWithTimezone}`;
};

const getEventDatesValue: GetDatesValue = ({
  service,
  dateTimeFrom,
  dateTimeTo,
  targetTimeZone,
  locale,
  is12HoursSystem,
}) => {
  const showTime = service?.viewConfig?.list?.showTime;
  const hourFormat = is12HoursSystem ? "h:mm a" : "H:mm";

  const dateFromWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const dateToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const timeFromWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    dateFormat: hourFormat,
    locale,
  });

  const timeToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    dateFormat: hourFormat,
    locale,
  });

  const hasSameDay = dateFromWithTimezone === dateToWithTimezone;

  if (hasSameDay && showTime) {
    return `${dateFromWithTimezone}, ${timeFromWithTimezone} - ${timeToWithTimezone}`;
  }
  if (hasSameDay) {
    return `${dateFromWithTimezone}, ${timeFromWithTimezone}`;
  }
  if (!showTime) {
    return `${dateFromWithTimezone} - ${dateToWithTimezone}`;
  }

  return `${dateFromWithTimezone}, ${timeFromWithTimezone} - ${dateToWithTimezone}, ${timeToWithTimezone}`;
};

export const getDatesValue: GetDatesValue = (params) => {
  switch (params.service?.viewConfig.displayType) {
    case BOOKING_FORM_TYPES.DAYS:
      return getDaysDatesValue(params);
    case BOOKING_FORM_TYPES.CALENDAR:
      return getCalendarDatesValue(params);
    case BOOKING_FORM_TYPES.LIST:
    case BOOKING_FORM_TYPES.MULTILIST:
      return getEventDatesValue(params);
    default:
      return "";
  }
};
