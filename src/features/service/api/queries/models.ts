import { FormField } from "models/formFields";
import {
  BookingStatusesConfigView,
  PaymentStatusesConfigView,
  PaymentType,
  BookingFormTypes,
} from "models/service";
import { Slot } from "models/slots";

export interface ServiceQueryResult {
  serviceId: string;
  project: {
    projectId: string;
    title: string;
    logoUrl: string | null;
    theme: "DARK" | "LIGHT";
    defaultLocale: string;
    localTimeZone: string;
  };
  title: string;
  description: string;
  price: number | null;
  promoPrice: number | null;
  currency: string;
  locations: Array<{
    title: string;
  }>;
  dateTimeTo: string;
  dateTimeFrom: string;
  media: Array<{ url: string }>;
  hosts: Array<{ fullName: string }>;
  viewConfig: {
    slot: {
      duration: boolean;
      quantity: boolean;
    };
    bookingStatus: BookingStatusesConfigView;
    paymentStatus: PaymentStatusesConfigView;
    dateTimeFormType: BookingFormTypes;
    range: {
      quantity: boolean;
      maxRange: string | null;
    };
  };
  formFields: Array<FormField>;
  paymentProviders: Array<PaymentType> | null;
}

export interface ServiceQueryVariables {
  serviceId: string;
}
export interface ServiceSlotsQueryResult {
  service?: {
    slots: Array<Slot>;
  };
}

export interface ServiceSlotsQueryVariables {
  serviceId: string;
  from: string;
  to: string;
}
