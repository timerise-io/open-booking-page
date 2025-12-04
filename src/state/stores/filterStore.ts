import { formatInTimeZone } from "date-fns-tz";
import { create } from "zustand";

export interface SlotsFilters {
  firstDayDate: string;
  fetchDate: string;
  pageSize: number;
  triggerId: number;
  locations: string[];
}

const defaultDayStart = formatInTimeZone(new Date(), "UTC", "yyyy-MM-dd");
const defaultFiltersPage: SlotsFilters = {
  firstDayDate: `${defaultDayStart}T00:00:00Z`,
  fetchDate: `${defaultDayStart}T00:00:00Z`,
  pageSize: 7,
  triggerId: 0,
  locations: [],
};

interface FilterState {
  slotsFilters: SlotsFilters;
  setSlotsFilters: (filters: SlotsFilters) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  slotsFilters: defaultFiltersPage,
  setSlotsFilters: (slotsFilters) => set({ slotsFilters }),
}));
