import { Project } from "models/project";
import { atom } from "recoil";

export const projectAtom = atom<Project | undefined>({
  key: "project",
  default: undefined,
});
