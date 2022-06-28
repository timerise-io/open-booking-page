import { selectorFamily } from "recoil";
import { serviceSlotsMapSelector } from "./serviceSlotsMap";

export const timeSlot = selectorFamily({
  key: "timeSlot",
  get:
    ({ from, to }: { from: string; to: string }) =>
    ({ get }) => {
      const slots = get(serviceSlotsMapSelector);

      return slots?.[from]?.[to];
    },
});
