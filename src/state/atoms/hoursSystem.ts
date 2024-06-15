import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { atom } from "recoil";

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

export const hoursSystemAtom = atom({
  key: "hoursSystem",
  default: getHoursSystem(),
});
