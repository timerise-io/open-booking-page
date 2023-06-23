import { Slot } from "models/slots";
import { selector } from "recoil";
import { serviceSlotsAtom } from "state/atoms/serviceSlots";

export const serviceSlotsMapSelector = selector({
  key: `serviceSlotsMapSelector`,
  get: ({ get }) => {
    const slots = get(serviceSlotsAtom);

    const slotsMap: Record<string, Record<string, Slot>> = slots.reduce((acc, item) => {
      return {
        ...acc,
        [item.dateTimeFrom]: {
          [item.dateTimeTo]: { ...item },
        },
      };
    }, {});

    return slotsMap;
  },
});
