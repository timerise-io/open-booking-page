import { Column } from "components/layout/Column";
import React from "react";
import styled from "styled-components";
import { useField } from "formik";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useTranslation } from "react-i18next";
import StyledLabel from "components/StyledLabel";
import StyledInput from "components/StyledInput";

const StyledNumberInput = styled(StyledInput)`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

interface NumberFieldProps {
  label?: string;
  name: string;
}

const NumberField: React.FC<NumberFieldProps> = ({ label, name }) => {
  const { t } = useTranslation(["forms"]);
  const labelToDisplay = label === undefined ? t(`${name}Field`) : label;

  const [field, meta] = useField({ name });

  return (
    <Column ai="stretch">
      <StyledLabel htmlFor={name}>{labelToDisplay}</StyledLabel>
      <StyledNumberInput id={name} {...field} type="number" />
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
