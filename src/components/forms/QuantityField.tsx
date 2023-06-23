import React, { ChangeEvent, useEffect } from "react";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import styled from "styled-components";

const StyledColumn = styled(Column)`
  position: relative;
`;

const StyledHint = styled(Typography)`
  position: absolute;
  top: 25px;
  right: 8px;
`;

interface QuantityFieldProps {
  label?: string;
  name: string;
  maxQuantity?: number | null;
}

const QuantityField: React.FC<QuantityFieldProps> = ({ name, label, maxQuantity = 1 }) => {
  const selectedSlot = useRecoilValue(selectedSlotSelector);
  const { t } = useTranslation(["forms"]);
  const labelToDisplay = label === undefined ? t(`${name}Field`) : label;

  const [, meta, helpers] = useField({ name });

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const maxValue =
    selectedSlot !== undefined && (maxQuantity ?? 1) > selectedSlot.quantity ? selectedSlot.quantity : maxQuantity ?? 1;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "") {
      setValue(0);
    }

    if (isNaN(+newValue) || isNaN(parseInt(newValue))) return;

    const newValueNum = parseInt(newValue);

    if (selectedSlot === undefined) {
      setValue(newValueNum);
      return;
    }

    if (newValueNum > maxValue) {
      setValue(maxValue);
      return;
    }

    setValue(newValueNum);
  };

  useEffect(() => {
    if (selectedSlot !== undefined && value > selectedSlot?.quantity) {
      setValue(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValue, selectedSlot?.quantity]);

  return (
    <StyledColumn ai="stretch">
      <StyledLabel htmlFor={name}>{labelToDisplay}</StyledLabel>
      <StyledInput
        id={name}
        value={value < 1 ? "" : value}
        onChange={handleChange}
        onBlur={() => {
          setTouched(true);
        }}
      />

      {selectedSlot !== undefined && (
        <StyledHint typographyType="body" as="span">
          {t("out-of", { maxValue })}
        </StyledHint>
      )}

      <Box h="13px" mt={0.5} mb={1}>
        {meta.error && meta.touched && (
          <Typography typographyType="label" as="span" color="error">
            {meta.error}
          </Typography>
        )}
      </Box>
    </StyledColumn>
  );
};

export default QuantityField;
