import { BOOKING_FORM_TYPES } from "models/service";
import { useBookingStore } from "state/stores";

export const useSlotsViewConfiguration = () => {
  const service = useBookingStore((state) => state.service);
  const { duration, quantity } = service?.viewConfig?.days ?? {
    duration: false,
    quantity: false,
  };
  const serviceType = service?.viewConfig.displayType;
  const isDateRange = serviceType === BOOKING_FORM_TYPES.CALENDAR;
  const isEvent = serviceType === BOOKING_FORM_TYPES.LIST || serviceType === BOOKING_FORM_TYPES.MULTILIST;

  const maxDaysPerPage = isDateRange || isEvent ? 365 : duration || quantity ? 7 : 7;
  const minDaysPerPage = duration || quantity ? 4 : 4;
  const slotsColumnWidth = duration || quantity ? 76 : 76;

  return {
    showDuration: duration,
    showQuantity: quantity,
    maxDaysPerPage,
    minDaysPerPage,
    slotsColumnWidth,
  };
};
