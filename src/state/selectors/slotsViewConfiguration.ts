import { BOOKING_FORM_TYPES } from "models/service";
import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

interface SlotViewConfiguration {
  showDuration: boolean;
  showQuantity: boolean;
  maxDaysPerPage: number;
  minDaysPerPage: number;
  slotsColumnWidth: number;
}

export const slotsViewConfiguration = selector<SlotViewConfiguration>({
  key: "slotsViewConfigurationSelection",
  get: ({ get }) => {
    const service = get(serviceAtom);
    const { duration, quantity } = service?.viewConfig?.days ?? {
      duration: false,
      quantity: false,
    };
    const serviceType = service?.viewConfig.displayType;
    const isDateRange = serviceType === BOOKING_FORM_TYPES.CALENDAR;
    const isEvent = serviceType === BOOKING_FORM_TYPES.LIST;

    const maxDaysPerPage = isDateRange || isEvent ? 365 : duration || quantity ? 5 : 7;
    const minDaysPerPage = duration || quantity ? 2 : 4;
    const slotsColumnWidth = duration || quantity ? 106 : 76;

    return {
      showDuration: duration,
      showQuantity: quantity,
      maxDaysPerPage,
      minDaysPerPage,
      slotsColumnWidth,
    };
  },
});
