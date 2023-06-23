import React from "react";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

const StyledTextArea = styled.textarea`
  all: unset;
  border-width: 1px;
  border-style: solid;
  &::placeholder {
    color: #666;
  }
  ${({ theme }) => css`
    background-color: ${theme.colorSchemas.input.background};
    border-color: ${theme.colorSchemas.input.border};
    border-radius: ${theme.borderRadius};
    font-size: ${theme.typography.body.size};
    padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});

    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    &:hover {
      border-color: ${theme.colorSchemas.input.borderHover};
    }
    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;

interface TextFieldProps {
  label?: string;
  name: string;
  multiline?: boolean;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, name, multiline = false, placeholder }) => {
  const { t } = useTranslation(["forms"]);
  const labelToDisplay = label === undefined ? t(`${name}Field`) : label;

  const [field, meta] = useField({ name });

  const input = multiline ? (
    <StyledTextArea id={name} placeholder={placeholder} rows={2} {...field} />
  ) : (
    <StyledInput id={name} placeholder={placeholder} {...field} />
  );

  return (
    <Column ai="stretch">
      <StyledLabel htmlFor={name}>{labelToDisplay}</StyledLabel>
      {input}
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

export default TextField;
