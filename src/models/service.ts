import { FormField } from "./formFields";

export interface FormInputConfigObject {
  enabled: boolean;
  required: boolean;
  label: string;
  order: number;
  width: number;
  defaultValue: string;
  __typename: string;
}

export interface UploadFileConfig extends FormInputConfigObject {
  accept: "PDF" | "IMAGE";
  multiple: boolean;
}

export interface QuantityConfig {
  enabled: boolean;
  label: string;
  order: number;
  width: number;
  defaultValue: number;
  maxValue: number;
  __typename: string;
}

export interface Service {
  serviceId: string;
  project: {
    projectId: string;
    title: string;
    logoUrl: string;
    theme: "DARK" | "LIGHT";
    defaultLocale: string;
    localTimeZone: string;
  };
  title: string;
  description: string;
  price: number;
  promoPrice: number | null;
  currency: string;
  locations: Array<string>;
  hostedBy: string;
  dateTimeTo: string;
  dateTimeFrom: string;
  images: Array<string>;
  formFields: Array<FormField>;
  viewConfig: {
    slot: {
      duration: boolean;
      quantity: boolean;
    };
  };
}
