import { gql } from "@apollo/client";

export const BOOK_SLOT = gql`
  mutation BookSlot(
    $serviceId: ID!
    $slots: [ID!]
    $formFields: JSON
    $paymentProvider: PaymentProvider
  ) {
    bookingCreate(
      serviceId: $serviceId
      slots: $slots
      formFields: $formFields
      paymentProvider: $paymentProvider
    ) {
      bookingId
    }
  }
`;

export const RESCHEDULE_BOOKING = gql`
  mutation BookingReschedule(
    $bookingId: ID!
    $slots: [ID!]
  ) {
    bookingReschedule(
      bookingId: $bookingId
      slots: $slots
    ) {
      bookingId
    }
  }
`;
