import { PaymentType } from "models/service";

export interface BookSlotMutationVariables {
  serviceId: string;
  slots: Array<string>;
  formFields: string;
  paymentProvider?: PaymentType;
}

export interface BookSlotMutationRespons {
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
