import { TFunction } from "react-i18next";
import * as Yup from "yup";

export const getStringFieldValidation = (t: TFunction<"forms"[]>, required: boolean) =>
  required ? Yup.string().required(t("common:validation.required")) : Yup.string();

export const getPhoneFieldValidation = (t: TFunction<"forms"[]>, required: boolean) =>
  required
    ? Yup.string()
        .required(t("common:validation.required"))
        .min(8, t("common:validation.min-length", { length: 8 }))
    : Yup.string().test({
        message: t("common:validation.min-length", { length: 8 }),
        test: (item) => item === undefined || item.length < 4 || item.length > 7,
      });

export const getEmailFieldValidation = (t: TFunction<"forms"[]>, required: boolean) =>
  required
    ? Yup.string().email(t("common:validation.email")).required(t("common:validation.required"))
    : Yup.string().email(t("common:validation.email"));
