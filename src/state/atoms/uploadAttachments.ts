import { atom } from "recoil";

export const uploadAttachmentsAtom = atom<
  Record<string, { isLoading: boolean }>
>({
  key: "uploadAttachmentsAtom",
  default: {},
});
