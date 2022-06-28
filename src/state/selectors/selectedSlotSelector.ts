import { selector } from "recoil";
import { selectedSlot } from "state/atoms/selectedSlot";
import { serviceSlotsAtom } from "state/atoms/serviceSlots";

export const selectedSlotSelector = selector({
  key: "selectedSlotSelector",
  get: ({ get }) => {
    const selectedDateTime = get(selectedSlot);
    const slots = get(serviceSlotsAtom);

    return slots.find((slot) => slot.dateTimeFrom === selectedDateTime);
  },
});
