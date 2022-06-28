import { atom } from "recoil";

export const langAtom = atom<string>({
  key: "langAtom",
  default: "en",
});
