import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { userPreferenceAtom } from "state/atoms/userPreference";

export const themeSelector = selector({
  key: "theme",
  get: ({ get }) => {
    const projectTheme: "light" | "dark" =
      get(serviceAtom)?.project.theme === "DARK" ? "dark" : "light";

    return get(userPreferenceAtom).theme ?? projectTheme ?? "light";
  },
});
