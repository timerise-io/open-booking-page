import { FormField } from "models/formFields";
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
  };
  formFields: Array<FormField>;
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
