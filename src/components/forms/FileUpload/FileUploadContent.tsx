import { Typography } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { FileUploadStyledButton } from "./FileUploadStyledButton";

interface FileUploadContentProps {
  fileName: string;
  isLoading: boolean;
  onClick: () => void;
}

const FileUploadContent = ({
  fileName,
  isLoading,
  onClick,
}: FileUploadContentProps) => {
  const { t } = useTranslation("forms");
  return (
    <>
      <Typography className="file-name" typographyType="body" as="span">
        {fileName} {isLoading && ` - ${t("Uploading")}`}
      </Typography>
      <FileUploadStyledButton
        type="button"
        onClick={() => {
          onClick();
        }}
        disabled={isLoading}
      >
        <Typography className="button-text" typographyType="body" as="span">
          {t(isLoading ? "Cancel" : "Delete")}
        </Typography>
      </FileUploadStyledButton>
    </>
  );
};

export default FileUploadContent;
