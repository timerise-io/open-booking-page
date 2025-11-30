import { create } from "zustand";

interface UploadState {
  uploadAttachments: Record<string, { isLoading: boolean }>;
  setUploadAttachments: (attachments: Record<string, { isLoading: boolean }>) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  uploadAttachments: {},
  setUploadAttachments: (uploadAttachments) => set({ uploadAttachments }),
}));
