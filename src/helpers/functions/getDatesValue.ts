import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { BOOKING_FORM_TYPES, Service } from "models/service";

type GetDatesValue = ({
  service,
  dateTimeFrom,
  dateTimeTo,
  targetTimeZone,
  sourceTimeZone,
  locale,
}: {
  service: Service;
  dateTimeFrom: string;
  dateTimeTo: string;
  targetTimeZone: string;
  sourceTimeZone: string;
  locale: Locale;
}) => string;

const getDaysDatesValue: GetDatesValue = ({ dateTimeFrom, targetTimeZone, sourceTimeZone, locale }) => {
  return convertSourceDateTimeToTargetDateTime({
    date: dateTimeFrom,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: "iiii dd MMM yyyy, H:mm",
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
}) => {
  const showTime = service?.viewConfig?.list?.showTime;

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
    dateFormat: "H:mm",
    locale,
  });

  const timeToWithTimezone = convertSourceDateTimeToTargetDateTime({
    date: dateTimeTo,
    targetTimeZone,
    sourceTimeZone,
    dateFormat: "H:mm",
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
}) => {
  const serviceType = service?.viewConfig.displayType;
  const sharedParams = {
    service,
    dateTimeFrom,
    dateTimeTo,
    targetTimeZone,
    sourceTimeZone,
    locale,
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
