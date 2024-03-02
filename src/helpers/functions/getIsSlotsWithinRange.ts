import { BOOKING_FORM_TYPES, Service } from "models/service";

type GetIsSlotsWithinRange = (args: { selectedSlotsLength: number; viewConfig: Service["viewConfig"] }) => boolean;

export const getIsSlotsWithinRange: GetIsSlotsWithinRange = ({ selectedSlotsLength, viewConfig }) => {
  const serviceType = viewConfig?.displayType;

  const isSlotType = serviceType === BOOKING_FORM_TYPES.DAYS;
  const isDateRangeType = serviceType === BOOKING_FORM_TYPES.CALENDAR;
  const isEventType = serviceType === BOOKING_FORM_TYPES.LIST;

  if (
    isSlotType &&
    viewConfig?.days?.multiSelect &&
    selectedSlotsLength &&
    viewConfig.days.minSelect &&
    viewConfig.days.maxSelect
  ) {
    const isItWithinRange =
      selectedSlotsLength >= viewConfig.days.minSelect && selectedSlotsLength <= viewConfig.days.maxSelect;

    return isItWithinRange;
  }

  if (isDateRangeType || isEventType) {
    return true;
  }

  return true;
};
