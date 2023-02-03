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
