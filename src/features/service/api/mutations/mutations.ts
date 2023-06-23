import { gql } from "@apollo/client";

export const BOOK_SLOT = gql`
  mutation BookSlot(
    $serviceId: ID!
    $slots: [ID]
    $formFields: JSON
    $paymentProvider: PaymentProvider
    $timezone: TimeZone
  ) {
    bookingCreate(
      serviceId: $serviceId
      slots: $slots
      formFields: $formFields
      paymentProvider: $paymentProvider
      timezone: $timezone
    ) {
      bookingId
    }
  }
`;

export const BOOK_DATE_RANGE = gql`
  mutation BookSlot(
    $serviceId: ID!
    $dateTimeFrom: DateTime
    $dateTimeTo: DateTime
    $formFields: JSON
    $paymentProvider: PaymentProvider
    $timezone: TimeZone
  ) {
    bookingCreate(
      serviceId: $serviceId
      dateTimeFrom: $dateTimeFrom
      dateTimeTo: $dateTimeTo
      formFields: $formFields
      paymentProvider: $paymentProvider
      timezone: $timezone
    ) {
      bookingId
    }
  }
`;

export const RESCHEDULE_BOOKING = gql`
  mutation BookingReschedule($bookingId: ID!, $slots: [ID!]) {
    bookingReschedule(bookingId: $bookingId, slots: $slots) {
      bookingId
    }
  }
`;
