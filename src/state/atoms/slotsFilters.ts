import formatInTimeZone from "date-fns-tz/formatInTimeZone";
import { atom } from "recoil";

export interface SlotsFiltersAtom {
  firstDayDate: string;
  fetchDate: string;
  pageSize: number;
  triggerId: number;
}

const defaultDayStart = formatInTimeZone(new Date(), "UTC", "yyyy-MM-dd");
const defaultFiltersPage: SlotsFiltersAtom = {
  firstDayDate: `${defaultDayStart}T00:00:00Z`,
  fetchDate: `${defaultDayStart}T00:00:00Z`,
  pageSize: 7,
  triggerId: 0,
};

export const slotsFiltersAtom = atom({
  key: "slotsFilters",
  default: defaultFiltersPage,
});
