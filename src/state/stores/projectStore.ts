import { Project } from "models/project";
import { create } from "zustand";

interface ProjectState {
  project: Project | undefined;
  location: string | undefined;

  setProject: (project: Project | undefined) => void;
  setLocation: (location: string | undefined) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: undefined,
  location: undefined,

  setProject: (project) => set({ project }),
  setLocation: (location) => set({ location }),
}));
