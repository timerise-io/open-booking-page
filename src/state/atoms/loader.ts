import { atomFamily } from "recoil";

export const LOADERS = {
  SERVICE: "SERVICE",
  SERVICE_SLOTS: "SERVICE_SLOTS",
  SERVICES: "SERVICES",
  PROJECT: "PROJECT",
  BOOKING: "BOOKING",
  BOOK_SERVICE: "BOOK_SERVICE",
};

export const loaderAtom = atomFamily({
  key: "loaderAtom",
  default: true,
});
