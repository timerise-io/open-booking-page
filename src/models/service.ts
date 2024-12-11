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

export enum PAYMENT_TYPES {
  OFFLINE = "OFFLINE",
  STRIPE = "STRIPE",
  ADYEN = "ADYEN",
}

export type PaymentType = keyof typeof PAYMENT_TYPES;

interface StatusConfig {
  description: string;
  details: boolean;
  iconUrl: string;
  title: string;
}

type BookingStatusConfigActions = "calendar" | "cancel" | "hide" | "pay" | "qr" | "reschedule" | "service" | "spaces";

interface BookingStatusConfig extends StatusConfig {
  actions: Record<BookingStatusConfigActions, boolean> | null;
}

type PaymentStatusConfigActions = BookingStatusConfigActions | "service";

interface PaymentStatusConfig extends StatusConfig {
  actions: Record<PaymentStatusConfigActions, boolean> | null;
}

export type BookingStatusesConfigView = Record<BookingStatus, BookingStatusConfig>;

export type PaymentStatusesConfigView = Record<PaymentStatus, PaymentStatusConfig>;

export enum BOOKING_FORM_TYPES {
  DAYS = "DAYS",
  CALENDAR = "CALENDAR",
  LIST = "LIST",
  MULTILIST = "MULTILIST",
  PREORDER = "PREORDER",
}

export type DisplayType = keyof typeof BOOKING_FORM_TYPES;

export interface Service {
  serviceId: string;
  project: {
    projectId: string;
    title: string;
    logoUrl: string;
    theme: "DARK" | "LIGHT";
    defaultLocale: string;
    localTimeZone: string;
    googleTagId: string | null;
  };
  title: string;
  description: string;
  price: number;
  promoPrice: number | null;
  currency: string;
  locations: Array<string>;
  serviceLocations: Array<{ locationId: string; title: string }>;
  hostedBy: string;
  dateTimeTo: string;
  dateTimeFrom: string;
  images: Array<string>;
  formFields: Array<FormField>;
  viewConfig: {
    bookingStatus: BookingStatusesConfigView;
    paymentStatus: PaymentStatusesConfigView;
    displayType: DisplayType;
    days: {
      duration: boolean;
      maxSelect: number | null;
      minSelect: number | null;
      multiSelect: boolean;
      quantity: boolean;
    };
    list: {
      duration: boolean;
      maxSelect: number | null;
      minSelect: number | null;
      multiSelect: boolean;
      quantity: boolean;
      showTime: boolean;
    };
    calendar: {
      maxRange: string | null;
      maxSelect: number | null;
      minRange: string | null;
      minSelect: number | null;
      multiSelect: boolean;
      rangeSelect: boolean;
      quantity: boolean;
    };
    multiList: {
      duration: boolean;
      quantity: boolean;
      showTime: boolean;
      multiSelect: boolean;
    };
    preorder: {
      duration: boolean;
      quantity: boolean;
      showDate: boolean;
      showTime: boolean;
      multiSelect?: boolean;
    };
  };
  paymentProviders: Array<PaymentType>;
}
