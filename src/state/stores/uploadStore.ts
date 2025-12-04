import { create } from "zustand";

interface UploadAttachment {
  isLoading: boolean;
}

interface UploadState {
  uploadAttachments: Record<string, UploadAttachment>;
  setUploadAttachments: (attachments: Record<string, UploadAttachment>) => void;
  setUploadAttachment: (key: string, attachment: UploadAttachment) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  uploadAttachments: {},
  setUploadAttachments: (uploadAttachments) => set({ uploadAttachments }),
  setUploadAttachment: (key, attachment) =>
    set((state) => ({
      uploadAttachments: { ...state.uploadAttachments, [key]: attachment },
    })),
}));
