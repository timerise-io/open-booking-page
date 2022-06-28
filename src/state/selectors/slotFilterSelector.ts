import { selector } from "recoil";
import { slotsFiltersAtom, SlotsFiltersAtom } from "state/atoms/slotsFilters";

export const slotsFilterSelector = selector({
  key: "slotsFilterSelector",
  get: ({ get }) => {
    const filters = get(slotsFiltersAtom);

    const calculatedFilters: SlotsFiltersAtom = {
      firstDayDate: filters.firstDayDate,
      fetchDate: filters.fetchDate,
      pageSize: filters.pageSize,
      triggerId: filters.triggerId,
    };

    return calculatedFilters;
  },
});
