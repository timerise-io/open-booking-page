import { PaymentType } from "models/service";

export interface BookSlotMutationVariables {
  serviceId: string;
  slots: Array<string>;
  formFields: string;
  paymentProvider?: PaymentType;
  timeZone: string;
  locale?: string;
}

export interface BookSlotMutationRespons {
  bookingCreate: {
    bookingId: string;
  };
}

export interface BookDateRangeMutationVariables {
  serviceId: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  formFields: string;
  paymentProvider?: PaymentType;
  timeZone: string;
  locale?: string;
}

export interface BookDateRangeMutationRespons {
  bookingCreate: {
    bookingId: string;
  };
}

export interface RescheduleBookingVariables {
  bookingId: string;
  slots: Array<string>;
}

export interface RescheduleBookingResponse {
  bookingReschedule: {
    bookingId: string;
  };
}
