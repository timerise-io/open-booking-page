import { Booking } from "models/booking";
import { atom } from "recoil";

export const bookingAtom = atom<Booking | undefined>({
  key: "booking",
  default: undefined,
});
