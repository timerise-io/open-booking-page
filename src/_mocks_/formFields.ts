export const formFieldFullName = {
  fieldId: "SYSTEM_FULL_NAME",
  fieldType: "SYSTEM_FULL_NAME" as const,
  required: true,
  label: "Full name",
  order: 0,
  width: 50,
  placeholder: "Enter your full name",
};

export const formFieldEmail = {
  fieldId: "SYSTEM_EMAIL_ADDRESS",
  fieldType: "SYSTEM_EMAIL_ADDRESS" as const,
  required: true,
  label: "E-mail",
  order: 1,
  width: 50,
  placeholder: "email@example.com",
};

export const formFieldPhone = {
  fieldId: "SYSTEM_PHONE_NUMBER",
  fieldType: "SYSTEM_PHONE_NUMBER" as const,
  required: false,
  label: "Phone number",
  order: 2,
  width: 50,
  placeholder: "+1 234 567 890",
};

export const formFieldMessage = {
  fieldId: "SYSTEM_MESSAGE",
  fieldType: "SYSTEM_MESSAGE" as const,
  required: false,
  label: "Message",
  order: 3,
  width: 100,
  height: 4,
  placeholder: "Enter your message here...",
};

export const formFieldSlotQuantity = {
  fieldId: "SYSTEM_SLOT_QUANTITY",
  fieldType: "SYSTEM_SLOT_QUANTITY" as const,
  required: true,
  label: "Number of guests",
  order: 4,
  width: 50,
  maxValue: 10,
};

export const formFieldGuestsList = {
  fieldId: "SYSTEM_GUESTS_LIST",
  fieldType: "SYSTEM_GUESTS_LIST" as const,
  required: false,
  label: "Guest list",
  order: 5,
  width: 100,
  minGuests: 1,
  maxGuests: 5,
};

export const formFieldAllowlistCode = {
  fieldId: "SYSTEM_ALLOWLIST_CODE",
  fieldType: "SYSTEM_ALLOWLIST_CODE" as const,
  required: true,
  label: "Access code",
  order: 6,
  width: 50,
  placeholder: "Enter access code",
};

export const formFieldPromoCode = {
  fieldId: "SYSTEM_PROMO_CODE",
  fieldType: "SYSTEM_PROMO_CODE" as const,
  required: false,
  label: "Promo code",
  order: 7,
  width: 50,
  placeholder: "Enter promo code",
};

export const formFieldText = {
  fieldId: "custom_text_field",
  fieldType: "TEXT" as const,
  required: false,
  label: "Custom text field",
  order: 8,
  width: 100,
  placeholder: "Enter text",
  validationRegex: null,
};

export const formFieldNumber = {
  fieldId: "custom_number_field",
  fieldType: "NUMBER" as const,
  required: false,
  label: "Custom number",
  order: 9,
  width: 50,
  maxValue: 100,
};

export const formFieldCheckbox = {
  fieldId: "custom_checkbox_field",
  fieldType: "CHECKBOX" as const,
  required: true,
  label: "I agree to the terms and conditions",
  order: 10,
  width: 100,
};

export const formFieldSelect = {
  fieldId: "custom_select_field",
  fieldType: "SELECT" as const,
  required: false,
  label: "Select an option",
  order: 11,
  width: 50,
  placeholder: "Choose...",
  values: ["Option A", "Option B", "Option C"],
};

export const formFieldFileUpload = {
  fieldId: "custom_file_upload",
  fieldType: "FILE_UPLOAD" as const,
  required: false,
  label: "Upload document",
  order: 12,
  accept: "application/pdf,image/*",
  buttonText: "Choose file",
  capture: false,
  multiple: false,
};

export const formFieldHidden = {
  fieldId: "custom_hidden_field",
  fieldType: "HIDDEN" as const,
  required: false,
  label: "",
  order: 13,
  value: "hidden_value",
};

export const formFields = [formFieldFullName, formFieldEmail, formFieldPhone, formFieldMessage];
