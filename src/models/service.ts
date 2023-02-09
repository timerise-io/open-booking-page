import { BookingStatus, PaymentStatus } from "./booking";
import { FormField } from "./formFields";

export interface FormInputConfigObject {
  enabled: boolean;
  required: boolean;
  label: string;
  order: number;
  width: number;
  defaultValue: string;
  placeholder: string;
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

export type PaymentType = "OFFLINE" | "STRIPE";

interface StatusConfig {
  description: string;
  details: boolean;
  iconUrl: string;
  title: string;
}

type BookingStatusConfigActions =
  | "calendar"
  | "cancel"
  | "hide"
  | "pay"
  | "qr"
  | "reschedule"
  | "service"
  | "spaces";

interface BookingStatusConfig extends StatusConfig {
  actions: Record<BookingStatusConfigActions, boolean> | null;
}

type PaymentStatusConfigActions = BookingStatusConfigActions | "service";

interface PaymentStatusConfig extends StatusConfig {
  actions: Record<PaymentStatusConfigActions, boolean> | null;
}

export type BookingStatusesConfigView = Record<
  BookingStatus,
  BookingStatusConfig
>;

export type PaymentStatusesConfigView = Record<
  PaymentStatus,
  PaymentStatusConfig
>;

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
    bookingStatus: BookingStatusesConfigView;
    paymentStatus: PaymentStatusesConfigView;
  };
  paymentProviders: Array<PaymentType>;
}
