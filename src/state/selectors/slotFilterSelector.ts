import { addDays, isAfter } from "date-fns";
import { format } from "date-fns-tz";
import { getDateInTimezone } from "helpers/timeFormat";
import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { slotsFiltersAtom, SlotsFiltersAtom } from "state/atoms/slotsFilters";

export const slotsFilterSelector = selector({
  key: "slotsFilterSelector",
  get: ({ get }) => {
    const filters = get(slotsFiltersAtom);
    const serviceMinDate =
      get(serviceAtom)?.dateTimeFrom ?? new Date().toISOString();

    const tomorrowMin = addDays(new Date(serviceMinDate), 1).toISOString();

    if (isAfter(new Date(tomorrowMin), new Date(filters.fetchDate))) {
      const now = new Date();
      const dateTimeFrom = getDateInTimezone(serviceMinDate);

      const newFetchDate = isAfter(now, dateTimeFrom) ? now : dateTimeFrom;

      const fetchDate = format(newFetchDate, "yyyy-MM-dd'T'HH:mm:00'Z'", {
        timeZone: "UTC",
      });

      const calculatedFilters: SlotsFiltersAtom = {
        firstDayDate: filters.firstDayDate,
        fetchDate,
        pageSize: filters.pageSize,
        triggerId: filters.triggerId,
      };

      return calculatedFilters;
    }

    const calculatedFilters: SlotsFiltersAtom = {
      firstDayDate: filters.firstDayDate,
      fetchDate: `${filters.fetchDate.split("T")[0]}T00:00:00Z`,
      pageSize: filters.pageSize,
      triggerId: filters.triggerId,
    };

    return calculatedFilters;
  },
});
