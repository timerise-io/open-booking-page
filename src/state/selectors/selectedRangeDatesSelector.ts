import { selector } from "recoil";
import { selectedDateRange } from "state/atoms/selectedDateRange";

export const selectedRangeDatesSelector = selector({
  key: "selectedRangeDatesSelector",
  get: ({ get }) => {
    const selectedDateTime = get(selectedDateRange);

    return selectedDateTime
  },
});
