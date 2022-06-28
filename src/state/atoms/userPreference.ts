import { atom } from "recoil";

interface UserPreference {
  theme?: "light" | "dark";
}

export const userPreferenceAtom = atom<UserPreference>({
  key: "userPreferenceAtom",
  default: {},
});
