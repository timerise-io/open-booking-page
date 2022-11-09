import { ContextSelect } from "components/ContextSelect";
import { Box } from "components/layout/Box";
import { Typography } from "components/Typography";
import { useField } from "formik";
import React from "react";

interface FormSelectProps {
  label?: string;
  name: string;
  options: Record<string, string>;
  hideErrors?: boolean;
  disabled?: boolean;
  additionalOptions?: Record<string, string>;
}

const SelectField = ({
  label,
  name,
  options,
  hideErrors = false,
  disabled = false,
  additionalOptions = {},
}: FormSelectProps) => {
  const [, meta, helpers] = useField({ name });

  return (
    <>
      <ContextSelect
        label={label ?? ""}
        value={meta.value}
        options={{ ...additionalOptions, ...options }}
        onChange={(value) => {
          helpers.setTouched(true);
          helpers.setValue(value);
        }}
        disabled={disabled}
      />
      {hideErrors === false && (
        <Box h="13px" mt={0.5} mb={1}>
          {meta.error && meta.touched && (
            <Typography typographyType="label" as="span" color="error">
              {meta.error}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default SelectField;
