import { gql } from "@apollo/client";

export const BOOK_SLOT = gql`
  mutation BookSlot($serviceId: ID!, $slotId: ID!, $formFields: JSON) {
    bookingCreate(
      serviceId: $serviceId
      slotId: $slotId
      formFields: $formFields
    ) {
      bookingId
    }
  }
`;
