import { useEffect, useState } from "react";
import axios from "axios";
import { useBookingStore, useUploadStore } from "state/stores";

export const useUploadFile = (fieldId: string) => {
  const service = useBookingStore((state) => state.service);
  const [filePath, setFilePath] = useState<string | undefined>();
  const [fileToUpload, setFileToUpload] = useState<ArrayBuffer | undefined>();
  const [fileToUploadExtension, setFileToUploadExtension] = useState<string | undefined>();
  const setUploadState = useUploadStore((state) => state.setUploadAttachment);

  const upload = (file: ArrayBuffer, extension: string) => {
    setFilePath(undefined);
    setFileToUpload(file);
    setFileToUploadExtension(extension);
  };

  useEffect(() => {
    if (service?.project.projectId === undefined || fileToUpload === undefined || fileToUploadExtension === undefined)
      return;

    setUploadState(fieldId, { isLoading: true });
    const controller = new AbortController();

    axios
      .post<{ filePath: string }>(
        `${import.meta.env.REACT_APP_TIMERISE_TOOLS_API}/upload?extension=${fileToUploadExtension}&projectId=${service.project.projectId}`,
        fileToUpload,
        {
          headers: {
            "content-type": "application/octet-stream",
          },
          signal: controller.signal,
        },
      )
      .then((response) => {
        setFilePath(response.data.filePath);
      })
      .catch(() => {})
      .finally(() => {
        setUploadState(fieldId, { isLoading: false });
      });

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, fileToUpload, fileToUploadExtension]);

  return { filePath, upload };
};
