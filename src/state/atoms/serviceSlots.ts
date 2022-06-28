import { atom } from "recoil";
import { Slot } from "models/slots";

export const serviceSlotsAtom = atom<Array<Slot>>({
  key: "serviceSlots",
  default: [],
});
