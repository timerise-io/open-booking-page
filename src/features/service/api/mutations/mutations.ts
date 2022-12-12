import { gql } from "@apollo/client";

export const BOOK_SLOT = gql`
  mutation BookSlot(
    $serviceId: ID!
    $slotId: ID!
    $formFields: JSON
    $paymentProvider: PaymentProvider
  ) {
    bookingCreate(
      serviceId: $serviceId
      slotId: $slotId
      formFields: $formFields
      paymentProvider: $paymentProvider
    ) {
      bookingId
    }
  }
`;
