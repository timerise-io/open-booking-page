import { atom } from "recoil";

export const selectedSlots = atom<string[]>({
  key: "selectedSlots",
  default: [],
});
