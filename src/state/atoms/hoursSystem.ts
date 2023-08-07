import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { atom } from "recoil";

export const hoursSystemAtom = atom({
  key: "hoursSystem",
  default: localStorage.getItem("HOURS_SYSTEM") ?? HOURS_SYSTEMS.h24,
});
