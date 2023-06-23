import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { uploadAttachmentsAtom } from "state/atoms/uploadAttachments";

export const useUploadFile = (fieldId: string) => {
  const service = useRecoilValue(serviceAtom);
  const [filePath, setFilePath] = useState<string | undefined>();
  const [fileToUpload, setFileToUpload] = useState<ArrayBuffer | undefined>();
  const [fileToUploadExtension, setFileToUploadExtension] = useState<string | undefined>();
  const setUploadState = useSetRecoilState(uploadAttachmentsAtom);

  const upload = (file: ArrayBuffer, extension: string) => {
    setFilePath(undefined);
    setFileToUpload(file);
    setFileToUploadExtension(extension);
  };

  useEffect(() => {
    if (service?.project.projectId === undefined || fileToUpload === undefined || fileToUploadExtension === undefined)
      return;

    setUploadState((loaders) => ({
      ...loaders,
      [fieldId]: { isLoading: true },
    }));
    const controller = new AbortController();

    axios
      .post<{ filePath: string }>(
        `${process.env.REACT_APP_TIMERISE_TOOLS_API}/upload?extension=${fileToUploadExtension}&projectId=${service.project.projectId}`,
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
      .catch((err) => {})
      .finally(() => {
        setUploadState((loaders) => ({
          ...loaders,
          [fieldId]: { isLoading: false },
        }));
      });

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, fileToUpload, fileToUploadExtension]);

  return { filePath, upload };
};
