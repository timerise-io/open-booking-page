import { atom } from "recoil";

export const selectedSlot = atom<string>({
  key: "selectedSlot",
  default: "",
});
