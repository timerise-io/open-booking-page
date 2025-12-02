import { TimezoneName, getAllTimezones } from "countries-and-timezones";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { create } from "zustand";

export const LOADERS = {
  SERVICE: "SERVICE",
  SERVICE_SLOTS: "SERVICE_SLOTS",
  SERVICES: "SERVICES",
  PROJECT: "PROJECT",
  BOOKING: "BOOKING",
  BOOK_SERVICE: "BOOK_SERVICE",
};

const localeUses24HourTime = (langCode: string) => {
  return (new Intl.DateTimeFormat(langCode, {
    hour: "numeric",
  })
    .formatToParts(new Date(2024, 0, 1, 13))
    .find((part) => part.type === "hour")?.value?.length === 2) as boolean;
};

const getHoursSystem = () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const hasLocalStorageValue = localStorage.getItem("HOURS_SYSTEM");
  const uses24HourTime = localeUses24HourTime(locale);

  return hasLocalStorageValue ?? (uses24HourTime ? HOURS_SYSTEMS.h24 : HOURS_SYSTEMS.h12);
};

interface UserPreference {
  theme?: "light" | "dark";
}

interface UiState {
  hoursSystem: string;
  lang: string;
  loaders: Record<string, boolean>;
  timeZone: string;
  userPreference: UserPreference;

  setHoursSystem: (hoursSystem: string) => void;
  setLang: (lang: string) => void;
  setLoader: (key: string, isLoading: boolean) => void;
  setTimeZone: (timeZone: string) => void;
  setUserPreference: (preference: UserPreference) => void;

  // Selectors
  getTimeZoneOffset: () => number;
}

export const useUiStore = create<UiState>((set, get) => ({
  hoursSystem: getHoursSystem(),
  lang: "en",
  loaders: {}, // In Recoil it was atomFamily default true. We might need to handle default true logic.
  timeZone: "Europe/London",
  userPreference: {},

  setHoursSystem: (hoursSystem) => set({ hoursSystem }),
  setLang: (lang) => set({ lang }),
  setLoader: (key, isLoading) =>
    set((state) => ({
      loaders: { ...state.loaders, [key]: isLoading },
    })),
  setTimeZone: (timeZone) => set({ timeZone }),
  setUserPreference: (userPreference) => set({ userPreference }),

  getTimeZoneOffset: () => {
    const { timeZone } = get();
    return getAllTimezones()[timeZone as TimezoneName]?.utcOffset ?? 0;
  },
}));
