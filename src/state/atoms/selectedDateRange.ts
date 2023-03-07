import { atom } from "recoil";

export const selectedDateRange = atom<any>({
  key: "selectedDateRange",
  default: { dateTimeFrom: null, dateTimeTo: null },
});
