import { FormField } from "models/formFields";
import { BookingStatusesConfigView, DisplayType, PaymentStatusesConfigView, PaymentType } from "models/service";
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
