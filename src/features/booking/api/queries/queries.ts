import { gql } from "@apollo/client";

export const GET_BOOKING = gql`
  query GetBooking($bookingId: ID!) {
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
      locations {
        locationId
        title
      }
    }
  }
`;
