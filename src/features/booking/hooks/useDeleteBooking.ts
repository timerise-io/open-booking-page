import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CancelBookingMutationResult, CancelBookingMutationVariables } from "../api/mutations/models";
import { CANCEL_BOOKING } from "../api/mutations/mutations";

export const useDeleteBooking = () => {
  const { id } = useParams<{ id: string }>();
  const [bookSlotMutation] = useMutation<CancelBookingMutationResult, CancelBookingMutationVariables>(CANCEL_BOOKING, {
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
    },
  });

  const deleteBooking = () => id && bookSlotMutation({ variables: { bookingId: id } });

  return deleteBooking;
};
