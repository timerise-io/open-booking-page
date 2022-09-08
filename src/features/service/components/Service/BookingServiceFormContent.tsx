import { Row } from "components/layout/Row";
import React from "react";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import styled from "styled-components";
import TextField from "components/forms/TextField";
import PhoneSelect from "components/forms/PhoneSelect";
import { useTranslation } from "react-i18next";
import QuantityField from "components/forms/QuantityField";
import { FormField } from "models/formFields";

const FormRow = styled(Row)`
  gap: 0 10px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    width: unset;
    min-width: 210px;
  }
`;

const splitFormConfigIntoRows = (fields: Array<FormField>) => {
  const result: Array<Array<FormField>> = [];

  fields.forEach((item) => {
    if (result.length === 0) {
      result.push([{ ...item }]);
      return;
    }

    const currentRow = result[result.length - 1];

    const currentRowWidth = currentRow.reduce(
      (acc, rowItem) => acc + rowItem.width,
      0
    );

    if (currentRowWidth + item.width > 100) {
      result.push([{ ...item }]);
    } else {
      currentRow.push({ ...item });
    }
  });

  return result;
};

const getFieldByTypename = (
  config: FormField,
  optionalSuffix: string
): React.ReactNode => {
  const label = `${config.label}${config.required ? "" : optionalSuffix}`;

  switch (config.fieldType) {
    case "SYSTEM_FULL_NAME": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_FULL_NAME`}
          name="fullName"
          label={label}
        />
      );
    }
    case "SYSTEM_ALLOWLIST_CODE": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_ALLOWLIST_CODE`}
          name="code"
          label={label}
        />
      );
    }
    case "SYSTEM_PHONE_NUMBER": {
      return (
        <PhoneSelect
          key={`booking-form-field-SYSTEM_PHONE_NUMBER`}
          name="phone"
          label={label}
        />
      );
    }
    case "SYSTEM_EMAIL_ADDRESS": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_EMAIL_ADDRESS`}
          name="email"
          label={label}
        />
      );
    }
    case "SYSTEM_MESSAGE": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_MESSAGE`}
          name="message"
          label={label}
          multiline
        />
      );
    }
    case "SYSTEM_SLOT_QUANTITY": {
      return (
        <QuantityField
          key={`booking-form-field-SYSTEM_SLOT_QUANTITY`}
          name="quantity"
          label={label}
          maxQuantity={config.maxValue}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export const BookingServiceFormContent = () => {
  const { t } = useTranslation(["forms"]);

  const optionalSuffix = t("optionalSuffix");

  const service = useRecoilValue(serviceAtom);
  const { formFields } = service ?? {};

  if (formFields === undefined || formFields?.length === 0) return null;

  const enabledFields = [...formFields].sort(
    (item, nextItem) => item.order - nextItem.order
  );

  const formRows = splitFormConfigIntoRows(enabledFields);

  return (
    <>
      {formRows.map((row, index) => {
        if (row.length === 1) {
          return getFieldByTypename(row[0], optionalSuffix);
        }

        return (
          <FormRow key={`booking-form-row-${index}`}>
            {row.map((item) => getFieldByTypename(item, optionalSuffix))}
          </FormRow>
        );
      })}
    </>
  );
};
