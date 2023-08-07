import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { BOOKING_FORM_TYPES, Service } from "models/service";

type GetDatesValue = ({
  service,
  dateTimeFrom,
  dateTimeTo,
  targetTimeZone,
  sourceTimeZone,
  locale,
  is12HoursSystem,
}: {
  service: Service;
  dateTimeFrom: string;
  dateTimeTo: string;
  targetTimeZone: string;
  sourceTimeZone: string;
  locale: Locale;
  is12HoursSystem: boolean;
}) => string;

const getDaysDatesValue: GetDatesValue = ({
  dateTimeFrom,
  targetTimeZone,
  sourceTimeZone,
  locale,
  is12HoursSystem,
}) => {
  const dateFormat = is12HoursSystem ? "iiii dd MMM yyyy, h:mm a" : "iiii dd MMM yyyy, H:mm";

  return convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    sourceTimeZone,
    dateFormat,
    locale,
  });
};

const getCalendarDatesValue: GetDatesValue = ({ dateTimeFrom, dateTimeTo, targetTimeZone, sourceTimeZone, locale }) => {
  const dateFromWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const dateToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const hasSameDay = dateFromWithTimezone === dateToWithTimezone;

  if (hasSameDay) {
    return `${dateFromWithTimezone}`;
  } else {
    return `${dateFromWithTimezone} - ${dateToWithTimezone}`;
  }
};

const getEventDatesValue: GetDatesValue = ({
  service,
  dateTimeFrom,
  dateTimeTo,
  targetTimeZone,
  sourceTimeZone,
  locale,
  is12HoursSystem,
}) => {
  const showTime = service?.viewConfig?.list?.showTime;
  const hourFormat = is12HoursSystem ? "h:mm a" : "H:mm";

  const dateFromWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const dateToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: "iii dd MMM yyyy",
    locale,
  });

  const timeFromWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: hourFormat,
    locale,
  });

  const timeToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: hourFormat,
    locale,
  });

  const hasSameDay = dateFromWithTimezone === dateToWithTimezone;

  if (hasSameDay && showTime) {
    return `${dateFromWithTimezone}, ${timeFromWithTimezone} - ${timeToWithTimezone}`;
  } else if (hasSameDay && !showTime) {
    return `${dateFromWithTimezone}, ${timeFromWithTimezone}`;
  } else if (!hasSameDay && !showTime) {
    return `${dateFromWithTimezone} - ${dateToWithTimezone}`;
  }

  return `${dateFromWithTimezone}, ${timeFromWithTimezone} - ${dateToWithTimezone}, ${timeToWithTimezone}`;
};

export const getDatesValue: GetDatesValue = ({
  service,
  dateTimeFrom,
  dateTimeTo,
  targetTimeZone,
  sourceTimeZone,
  locale,
  is12HoursSystem,
}) => {
  const serviceType = service?.viewConfig.displayType;
  const sharedParams = {
    service,
    dateTimeFrom,
    dateTimeTo,
    targetTimeZone,
    sourceTimeZone,
    locale,
    is12HoursSystem,
  };

  if (serviceType === BOOKING_FORM_TYPES.DAYS) {
    return getDaysDatesValue(sharedParams);
  } else if (serviceType === BOOKING_FORM_TYPES.CALENDAR) {
    return getCalendarDatesValue(sharedParams);
  } else if (serviceType === BOOKING_FORM_TYPES.LIST) {
    return getEventDatesValue(sharedParams);
  }

  return "";
};
