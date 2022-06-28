import { atom } from "recoil";

export const timeZoneAtom = atom({
  key: "timeZone",
  default: "Europe/London",
});
