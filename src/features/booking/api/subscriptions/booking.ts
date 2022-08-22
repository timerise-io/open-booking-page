import { gql } from "@apollo/client";

export const BOOKING_SUBSCRIPTION = gql`
  subscription GetBooking($bookingId: ID!) {
    booking(bookingId: $bookingId) {
      bookingId
      shortId
      service {
        serviceId
        spaces {
          url
          title
          spaceId
          instructions
          provider
        }
      }
      dateTimeFrom
      status
      createdAt
      qrUrl
      iCalUrl
    }
  }
`;
