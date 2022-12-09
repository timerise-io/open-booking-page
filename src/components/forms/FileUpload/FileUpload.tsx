import React, { useEffect, useId, useState } from "react";
import StyledLabel from "components/StyledLabel";
import { Column } from "components/layout/Column";
import { FormFieldFileUpload } from "models/formFields";
import { Box } from "components/layout/Box";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import styled, { css } from "styled-components";
import { useUploadFile } from "helpers/hooks/useUploadFile";
import { useField } from "formik";
import NoFileFileUploadContent from "./NoFileFileUploadContent";
import FileUploadContent from "./FileUploadContent";

const StyledRow = styled(Row)`
  border-radius: 4px;
  width: 100%;

  & > .file-name {
    margin-left: 12px;
  }

  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.fileUpload.backgroundColor};
    `;
  }}
`;

const UploadInput = styled.input`
  display: none;
`;

const FileUpload = ({ label, accept, fieldId }: FormFieldFileUpload) => {
  const uploadInputId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const { filePath, upload } = useUploadFile(fieldId);
  const [fileName, setFileName] = useState("");
  const [, meta, helpers] = useField({ name: fieldId });
  const { setValue } = helpers;

  const uploadLogo = (file: File) => {
    setFileName(file.name);
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (this) {
      if (this.result instanceof ArrayBuffer) {
        upload(this.result, file.type.split("/")[1]);
      }
    };
  };

  useEffect(() => {
    if (!!filePath) {
      setIsLoading(false);
      setValue(filePath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  const noFileContent = (
    <NoFileFileUploadContent
      onClick={() => {
        document.getElementById(uploadInputId)?.click();
      }}
    />
  );

  const fileContent = (
    <FileUploadContent
      isLoading={isLoading}
      fileName={fileName}
      onClick={() => {
        setFileName("");
        setValue("");
      }}
    />
  );

  return (
    <Column ai="stretch">
      <UploadInput
        id={uploadInputId}
        type="file"
        accept={accept ?? "*"}
        value={""}
        onChange={(event: { target: HTMLInputElement }) => {
          const files = event.target.files;

          if (files === null || files.length === 0) return;

          uploadLogo(files[0]);
        }}
      />
      <StyledLabel>{label}</StyledLabel>
      <StyledRow>{fileName === "" ? noFileContent : fileContent}</StyledRow>
      <Box h="13px" mt={0.5} mb={1}>
        {meta.error && meta.touched && (
          <Typography typographyType="label" as="span" color="error">
            {meta.error}
          </Typography>
        )}
      </Box>
    </Column>
  );
};

export default FileUpload;
