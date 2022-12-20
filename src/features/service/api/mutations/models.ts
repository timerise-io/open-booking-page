import { PaymentType } from "models/service";

export interface BookSlotMutationVariables {
  serviceId: string;
  slotId: string;
  formFields: string;
  paymentProvider?: PaymentType;
}

export interface BookSlotMutationRespons {
  bookingCreate: {
    bookingId: string;
  };
}
