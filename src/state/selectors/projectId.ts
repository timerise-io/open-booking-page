import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

export const getProjectId = selector({
  key: "getProjectId",
  get: ({ get }) => get(serviceAtom)?.project.projectId,
});
