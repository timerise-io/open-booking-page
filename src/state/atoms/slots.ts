import { Slot } from "models/slots";
import { atom } from "recoil";

export const slotsAtom = atom<Slot[]>({
  key: "slots",
  default: [],
});
