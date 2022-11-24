export type FormFieldSystemType =
  | "SYSTEM_FULL_NAME"
  | "SYSTEM_EMAIL_ADDRESS"
  | "SYSTEM_PHONE_NUMBER"
  | "SYSTEM_MESSAGE"
  | "SYSTEM_SLOT_QUANTITY"
  | "SYSTEM_ALLOWLIST_CODE";

export type FormFieldCustomType = "TEXT" | "NUMBER" | "SELECT" | "CHECKBOX";

export type FormFieldType = FormFieldSystemType | FormFieldCustomType;

const systemFieldsList: Array<FormFieldSystemType> = [
  "SYSTEM_FULL_NAME",
  "SYSTEM_EMAIL_ADDRESS",
  "SYSTEM_PHONE_NUMBER",
  "SYSTEM_MESSAGE",
  "SYSTEM_SLOT_QUANTITY",
  "SYSTEM_ALLOWLIST_CODE",
];

export const isSystemField = (formField: FormField) => {
  return (
    systemFieldsList.findIndex((item) => item === formField.fieldType) > -1
  );
};

export const filterFormFields = (
  formFields: Array<FormField>,
  system = true
) => {
  return formFields.filter((item) => isSystemField(item) === system);
};

export interface BaseFormField {
  fieldId: string;
  required: boolean;
  label: string;
  order: number;
}

export type FormFieldSystemFullName = BaseFormField & {
  fieldType: "SYSTEM_FULL_NAME";
  width: number;
  placeholder: string;
};

export type FormFieldSystemAllowlistCode = BaseFormField & {
  fieldType: "SYSTEM_ALLOWLIST_CODE";
  width: number;
  placeholder: string;
};

export type FormFieldSystemEmailAddress = BaseFormField & {
  fieldType: "SYSTEM_EMAIL_ADDRESS";
  width: number;
  placeholder: string;
};

export type FormFieldSystemPhoneNumber = BaseFormField & {
  fieldType: "SYSTEM_PHONE_NUMBER";
  width: number;
  placeholder: string;
};

export type FormFieldSystemMessage = BaseFormField & {
  fieldType: "SYSTEM_MESSAGE";
  width: number;
  height: number;
  placeholder: string;
};

export type FormFieldSystemSlotQuantity = BaseFormField & {
  fieldType: "SYSTEM_SLOT_QUANTITY";
  width: number;
  maxValue: number;
};

export type FormFieldText = BaseFormField & {
  fieldType: "TEXT";
  width: number | null;
  placeholder: string;
};

export type FormFieldNumber = BaseFormField & {
  fieldType: "NUMBER";
  width: number | null;
  maxValue: number | null;
};

export type FormFieldCheckbox = BaseFormField & {
  fieldType: "CHECKBOX";
  width: number | null;
};

export type FormFieldSelect = BaseFormField & {
  fieldType: "SELECT";
  placeholder: string;
  values: Array<string>;
  width: number | null;
};

export type FormField =
  | FormFieldSystemFullName
  | FormFieldSystemEmailAddress
  | FormFieldSystemPhoneNumber
  | FormFieldSystemMessage
  | FormFieldSystemMessage
  | FormFieldSystemSlotQuantity
  | FormFieldSystemAllowlistCode
  | FormFieldText
  | FormFieldNumber
  | FormFieldCheckbox
  | FormFieldSelect;
