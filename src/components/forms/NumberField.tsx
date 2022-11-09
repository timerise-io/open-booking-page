import { Column } from "components/layout/Column";
import React from "react";
import styled, { css } from "styled-components";
import { useField } from "formik";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useTranslation } from "react-i18next";
import StyledLabel from "components/StyledLabel";
import StyledInput from "components/StyledInput";

const StyledTextArea = styled.textarea`
  all: unset;
  border-width: 1px;
  border-style: solid;
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

interface NumberFieldProps {
  label?: string;
  name: string;
}

const NumberField: React.FC<NumberFieldProps> = ({ label, name }) => {
  const { t } = useTranslation(["forms"]);
  const labelToDisplay = label === undefined ? t(`${name}Field`) : label;

  const [field, meta] = useField({ name });

  console.log(meta.error);
  return (
    <Column ai="stretch">
      <StyledLabel htmlFor={name}>{labelToDisplay}</StyledLabel>
      <StyledInput id={name} {...field} type="number" />
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

export default NumberField;
