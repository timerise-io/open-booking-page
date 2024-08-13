import { atom } from "recoil";

export const locationAtom = atom<string | undefined>({
  key: "location",
  default: undefined,
});
