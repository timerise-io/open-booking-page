import { FormField, filterFormFields } from "models/formFields";
import { TFunction } from "react-i18next";
import * as Yup from "yup";
import { getCustomFieldsValidation } from "./customFields";
import {
  getStringFieldValidation,
  getPhoneFieldValidation,
  getEmailFieldValidation,
} from "./systemFields";

export const generateValidationSchema = (
  t: TFunction<"forms"[]>,
  formFields: Array<FormField>,
  isAcceptRequired: boolean
) => {
  if (formFields.length === 0) return Yup.object({});

  const systemFullName = formFields.find(
    (item) => item.fieldType === "SYSTEM_FULL_NAME"
  );
  const systemPhoneNumber = formFields.find(
    (item) => item.fieldType === "SYSTEM_PHONE_NUMBER"
  );
  const systemEmailAddress = formFields.find(
    (item) => item.fieldType === "SYSTEM_EMAIL_ADDRESS"
  );
  const systemMessage = formFields.find(
    (item) => item.fieldType === "SYSTEM_MESSAGE"
  );
  const systemSlotQuantity = formFields.find(
    (item) => item.fieldType === "SYSTEM_SLOT_QUANTITY"
  );
  // const systemGuestsList = formFields.find(
  //   (item) => item.fieldType === "SYSTEM_GUESTS_LIST"
  // );
  const systemAllowListCode = formFields.find(
    (item) => item.fieldType === "SYSTEM_ALLOWLIST_CODE" && item.required
  );

  const requiredCustomFormFields = filterFormFields(formFields, false);

  return Yup.object({
    ...Object.assign(
      {},
      ...requiredCustomFormFields.map((item) => {
        return getCustomFieldsValidation(item, t);
      })
    ),
    ...(systemFullName && {
      fullName: getStringFieldValidation(t, systemFullName.required),
    }),
    ...(systemPhoneNumber && {
      phone: getPhoneFieldValidation(t, systemPhoneNumber.required),
    }),
    ...(systemEmailAddress && {
      email: getEmailFieldValidation(t, systemEmailAddress.required),
    }),
    ...(systemMessage && {
      message: getStringFieldValidation(t, systemMessage.required),
    }),
    ...(systemSlotQuantity && {
      quantity: Yup.number().min(1, t("common:validation.slots-quantity")),
    }),
    // ...(systemGuestsList),
    ...(isAcceptRequired && {
      requireAgreement: Yup.boolean().isTrue(t("common:validation.required")),
    }),
    ...(systemAllowListCode && {
      code: Yup.string().required(t("common:validation.required")),
    }),
  });
};
