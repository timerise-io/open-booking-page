import { VERSION } from "enums";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { CancelBookingMutationResult, CancelBookingMutationVariables } from "../api/mutations/models";
import { CANCEL_BOOKING } from "../api/mutations/mutations";

export const useDeleteBooking = () => {
  const { id } = useParams<{ id: string }>();
  const [bookSlotMutation] = useMutation<CancelBookingMutationResult, CancelBookingMutationVariables>(CANCEL_BOOKING, {
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
      version: VERSION.V1,
    },
    update: (cache, { data }) => {
      if (data?.bookingDelete && id) {
        // Update booking status in cache
        cache.modify({
          id: cache.identify({
            __typename: "Booking",
            bookingId: id,
          }),
          fields: {
            status: () => "CANCELED",
          },
        });
        // Evict slots to show returned availability
        cache.evict({ fieldName: "slots" });
        cache.gc();
      }
    },
  });

  const deleteBooking = () => id && bookSlotMutation({ variables: { bookingId: id } });

  return deleteBooking;
};
