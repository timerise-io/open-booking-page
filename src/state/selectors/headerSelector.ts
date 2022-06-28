import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

export const headerSelector = selector({
  key: "header",
  get: ({ get }) => {
    const service = get(serviceAtom);
    if (!service) return;
    return {
      title: service.project.title,
      logoUrl: service.project.logoUrl,
    };
  },
});
