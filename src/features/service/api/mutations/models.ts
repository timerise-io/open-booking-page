export interface BookSlotMutationVariables {
  serviceId: string;
  slotId: string;
  formFields: string;
}

export interface BookSlotMutationRespons {
  bookingCreate: {
    bookingId: string;
  };
}
