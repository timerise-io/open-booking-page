import { useBookingStore } from "./stores/bookingStore";
import { useUiStore } from "./stores/uiStore";
import { useProjectStore } from "./stores/projectStore";
import { useFilterStore } from "./stores/filterStore";
import { addDays, isAfter } from "date-fns";
import { format } from "date-fns-tz";
import { getDateInTimezone } from "helpers/timeFormat";
import { SlotsFilters } from "./stores/filterStore";

/**
 * Hook for theme selector (depends on service from bookingStore and userPreference from uiStore)
 */
export const useTheme = (): "light" | "dark" => {
  const service = useBookingStore((state) => state.service);
  const userPreference = useUiStore((state) => state.userPreference);

  const projectTheme: "light" | "dark" = service?.project.theme === "DARK" ? "dark" : "light";
  return userPreference.theme ?? projectTheme ?? "light";
};

/**
 * Hook for project ID (depends on service from bookingStore)
 */
export const useProjectId = (): string | undefined => {
  return useBookingStore((state) => state.service?.project.projectId);
};

/**
 * Hook for slot filter selector (complex logic with multiple store dependencies)
 */
export const useSlotFilter = (): SlotsFilters => {
  const filters = useFilterStore((state) => state.slotsFilters);
  const serviceMinDate = useBookingStore((state) => state.service?.dateTimeFrom ?? new Date().toISOString());
  const location = useProjectStore((state) => state.location);

  const tomorrowMin = addDays(new Date(serviceMinDate), 1).toISOString();

  if (isAfter(new Date(tomorrowMin), new Date(filters.fetchDate))) {
    const now = new Date();
    const dateTimeFrom = getDateInTimezone(serviceMinDate);
    const newFetchDate = isAfter(now, dateTimeFrom) ? now : dateTimeFrom;

    const fetchDate = format(newFetchDate, "yyyy-MM-dd'T'HH:mm:00'Z'", {
      timeZone: "UTC",
    });

    return {
      firstDayDate: filters.firstDayDate,
      fetchDate,
      pageSize: filters.pageSize,
      triggerId: filters.triggerId,
      locations: location ? [location] : [],
    };
  }

  return {
    firstDayDate: filters.firstDayDate,
    fetchDate: `${filters.fetchDate.split("T")[0]}T00:00:00Z`,
    pageSize: filters.pageSize,
    triggerId: filters.triggerId,
    locations: location ? [location] : [],
  };
};
