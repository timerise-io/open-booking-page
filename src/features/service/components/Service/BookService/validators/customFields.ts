import { FormField, FormFieldNumber, FormFieldText } from "models/formFields";
import { TFunction } from "react-i18next";
import * as Yup from "yup";

export const getCustomFieldsValidation = (
  item: FormField,
  t: TFunction<"forms"[]>
) => {
  if (item.fieldType === "CHECKBOX")
    return getCheckBoxCustomFieldsValidation(item, t);
  if (item.fieldType === "NUMBER")
    return getNumberCustomFieldsValidation(item, t);
  if (item.fieldType === "SELECT")
    return getSelectCustomFieldsValidation(item, t);
  if (item.fieldType === "TEXT") return getTextCustomFieldsValidation(item, t);
  return {};
};

const getCheckBoxCustomFieldsValidation = (
  item: FormField,
  t: TFunction<"forms"[]>
) => {
  let schema = Yup.boolean();

  if (item.required) {
    schema = schema.isTrue(t("common:validation.required"));
  }

  return {
    [item.fieldId]: schema,
  };
};

const getSelectCustomFieldsValidation = (
  item: FormField,
  t: TFunction<"forms"[]>
) => {
  let schema = Yup.array();

  if (item.required) {
    schema = schema.min(1, t("common:validation.required"));
  }

  return {
    [item.fieldId]: schema,
  };
};

const getTextCustomFieldsValidation = (
  item: FormFieldText,
  t: TFunction<"forms"[]>
) => {
  let schema = Yup.string();

  if (item.required) {
    schema = schema.required(t("common:validation.required"));
  }

  if (item.validationRegex) {
    schema = schema.matches(
      new RegExp(item.validationRegex),
      t("common:validation.incorrect-format")
    );
  }

  return {
    [item.fieldId]: schema,
  };
};

const getNumberCustomFieldsValidation = (
  item: FormFieldNumber,
  t: TFunction<"forms"[]>
) => {
  let schema = Yup.number();

  if (item.required) {
    schema = schema
      .required(t("common:validation.required"))
      .min(0, t("common:validation.minValue", { minValue: 0 }));
  }

  if (item.maxValue !== null) {
    schema = schema.max(
      item.maxValue,
      t("common:validation.maxValue", { maxValue: item.maxValue })
    );
  }

  return {
    [item.fieldId]: schema,
  };
};
