import { Slot } from "models/slots";
import { atom } from "recoil";

export const serviceSlotsAtom = atom<Array<Slot>>({
  key: "serviceSlots",
  default: [],
});
