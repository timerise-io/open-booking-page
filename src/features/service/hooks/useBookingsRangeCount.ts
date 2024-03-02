import { BOOKING_FORM_TYPES, Service } from "models/service";

type UseBookingsRangeCount = (args: { viewConfig: Service["viewConfig"] }) => {
  minSelect: number | null;
  maxSelect: number | null;
};

export const useBookingsRangeCount: UseBookingsRangeCount = ({ viewConfig }) => {
  const serviceType = viewConfig?.displayType;

  const isSlotType = serviceType === BOOKING_FORM_TYPES.DAYS;
  const isDateRangeType = serviceType === BOOKING_FORM_TYPES.CALENDAR;
  const isEventType = serviceType === BOOKING_FORM_TYPES.LIST;

  if (isSlotType && viewConfig?.days?.multiSelect) {
    return {
      minSelect: viewConfig.days.minSelect,
      maxSelect: viewConfig.days.maxSelect,
    };
  } else if (isDateRangeType && viewConfig?.calendar?.multiSelect) {
    return {
      minSelect: viewConfig.calendar.minSelect,
      maxSelect: viewConfig.calendar.maxSelect,
    };
  } else if (isEventType && viewConfig?.list?.multiSelect) {
    return {
      minSelect: viewConfig.list.minSelect,
      maxSelect: viewConfig.list.maxSelect,
    };
  }

  return {
    minSelect: null,
    maxSelect: null,
  };
};
