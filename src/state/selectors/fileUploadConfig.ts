import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

export const fileUploadConfigSelector = selector({
  key: "fileUploadConfigSelector",
  get: ({ get }) => {
    // return get(serviceAtom)?.formConfig.fileUpload;
    return undefined;
  },
});
