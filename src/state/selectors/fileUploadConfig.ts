import { selector } from "recoil";

export const fileUploadConfigSelector = selector({
  key: "fileUploadConfigSelector",
  get: ({ get }) => {
    // return get(serviceAtom)?.formConfig.fileUpload;
    return undefined;
  },
});
