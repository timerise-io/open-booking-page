import { Service } from "models/service";
import { atom } from "recoil";

export const serviceAtom = atom<Service | undefined>({
  key: "service",
  default: undefined,
});
