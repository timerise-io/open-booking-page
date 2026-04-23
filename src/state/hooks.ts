import { useMemo } from "react";
import { addDays, format as formatDate, isAfter } from "date-fns";
import { toApiDateTime } from "helpers/functions";
import { getDateInTimezone } from "helpers/timeFormat";
import { Slot } from "models/slots";
import { useBookingStore } from "./stores/bookingStore";
import { SlotsFilters, useFilterStore } from "./stores/filterStore";
import { useProjectStore } from "./stores/projectStore";
import { useUiStore } from "./stores/uiStore";

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

    const fetchDate = toApiDateTime(newFetchDate);

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

export interface DayPattern {
  key: string;
  from: string;
  to: string;
}

/**
 * Hook for slots day pattern - groups slots by unique time patterns
 */
export const useSlotsDayPattern = (): DayPattern[] => {
  const serviceSlots = useBookingStore((state) => state.serviceSlots);

  return useMemo(() => {
    const uniqueTimes = new Map<string, DayPattern>();
    serviceSlots.forEach((slot) => {
      const fromTime = slot.dateTimeFrom.split("T")[1];
      const toTime = slot.dateTimeTo.split("T")[1];
      const key = `${fromTime}-${toTime}`;

      if (!uniqueTimes.has(key)) {
        uniqueTimes.set(key, {
          key,
          from: fromTime,
          to: toTime,
        });
      }
    });
    return Array.from(uniqueTimes.values()).sort((a, b) => a.from.localeCompare(b.from));
  }, [serviceSlots]);
};

/**
 * Hook for page dates - calculates dates for calendar pagination
 */
export const usePageDates = (): string[] => {
  const filters = useFilterStore((state) => state.slotsFilters);

  return useMemo(() => {
    const startDate = new Date(filters.firstDayDate);
    const dates: string[] = [];
    const pageSize = filters.pageSize || 7;

    for (let i = 0; i < pageSize; i++) {
      const date = addDays(startDate, i);
      dates.push(formatDate(date, "yyyy-MM-dd"));
    }

    return dates;
  }, [filters.firstDayDate, filters.pageSize]);
};

/**
 * Hook for default phone prefix based on service location
 */
export const useDefaultPhonePrefix = (): string => {
  const service = useBookingStore((state) => state.service);

  return useMemo(() => {
    if (service?.project?.defaultLocale) {
      const parts = service.project.defaultLocale.split("-");
      if (parts.length > 1) {
        return parts[1].toUpperCase();
      }
    }
    return "US";
  }, [service]);
};

/**
 * Hook for getting a specific time slot with formatted information
 */
export const useTimeSlot = (slotId: string): Slot | undefined => {
  const slots = useBookingStore((state) => state.slots);

  return useMemo(() => {
    return slots.find((slot) => slot.slotId === slotId);
  }, [slots, slotId]);
};

/**
 * Hook for getting a specific time slot by date range
 */
export const useTimeSlotByDate = (from: string, to: string): Slot | undefined => {
  const serviceSlots = useBookingStore((state) => state.serviceSlots);

  return useMemo(() => {
    return serviceSlots.find((slot) => slot.dateTimeFrom === from && slot.dateTimeTo === to);
  }, [serviceSlots, from, to]);
};
