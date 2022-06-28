export type FormFieldType =
  | "SYSTEM_FULL_NAME"
  | "SYSTEM_EMAIL_ADDRESS"
  | "SYSTEM_PHONE_NUMBER"
  | "SYSTEM_MESSAGE"
  | "SYSTEM_SLOT_QUANTITY";

export const FormFieldTypeDefaults: Record<FormFieldType, FormField> = {
  SYSTEM_FULL_NAME: {
    fieldId: "",
    required: false,
    label: "",
    order: 0,
    fieldType: "SYSTEM_FULL_NAME",
    width: 100,
    placeholder: "",
  },
  SYSTEM_EMAIL_ADDRESS: {
    fieldId: "",
    required: false,
    label: "",
    order: 0,
    fieldType: "SYSTEM_EMAIL_ADDRESS",
    width: 100,
    placeholder: "",
  },
  SYSTEM_PHONE_NUMBER: {
    fieldId: "",
    required: false,
    label: "",
    order: 0,
    fieldType: "SYSTEM_PHONE_NUMBER",
    width: 100,
    placeholder: "",
  },
  SYSTEM_MESSAGE: {
    fieldId: "",
    required: false,
    label: "",
    order: 0,
    fieldType: "SYSTEM_MESSAGE",
    width: 100,
    placeholder: "",
    height: 3,
  },
  SYSTEM_SLOT_QUANTITY: {
    fieldId: "",
    required: false,
    label: "",
    order: 0,
    fieldType: "SYSTEM_SLOT_QUANTITY",
    width: 100,
    maxValue: 10,
  },
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

export type FormField =
  | FormFieldSystemFullName
  | FormFieldSystemEmailAddress
  | FormFieldSystemPhoneNumber
  | FormFieldSystemMessage
  | FormFieldSystemMessage
  | FormFieldSystemSlotQuantity;
