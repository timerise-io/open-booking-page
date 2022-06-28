import { gql } from "@apollo/client";

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($bookingId: ID!) {
    bookingConfirm(bookingId: $bookingId) {
      status
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    bookingCancel(bookingId: $bookingId) {
      bookingId
    }
  }
`;

export const PUBLISH_BOOKING = gql`
  mutation PublishBooking($bookingId: ID!) {
    bookingPublish(bookingId: $bookingId) {
      status
    }
  }
`;
