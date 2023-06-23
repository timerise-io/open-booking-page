import { addDays } from "date-fns";
import { selector } from "recoil";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";

const filterFirstDayDate = selector({
  key: "filterFirstDayDateSelector",
  get: ({ get }) => {
    return get(slotsFiltersAtom).firstDayDate;
  },
});

export const pageDates = selector({
  key: "pageDates",
  get: ({ get }) => {
    const firstDayDate = get(filterFirstDayDate);

    const firstDate = new Date(firstDayDate);

    const result: Array<string> = new Array(7).fill(undefined).map((_, index) => {
      return addDays(firstDate, index).toISOString();
    });

    return result;
  },
});
