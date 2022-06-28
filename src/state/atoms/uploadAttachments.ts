import { atom } from "recoil";

export const uploadAttachmentsAtom = atom<{
  state: "inProgress" | "done";
  fileCount: number;
}>({
  key: "uploadAttachmentsAtom",
  default: { state: "done", fileCount: 0 },
});
