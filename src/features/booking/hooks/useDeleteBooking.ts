import { useLangParam } from "features/i18n/useLangParam";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { CancelBookingMutationResult, CancelBookingMutationVariables } from "../api/mutations/models";
import { CANCEL_BOOKING } from "../api/mutations/mutations";

export const useDeleteBooking = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  const [cancelBookingMutation] = useMutation<CancelBookingMutationResult, CancelBookingMutationVariables>(
    CANCEL_BOOKING,
    {
      context: {
        headers: {
          ...(lang && { "Accept-Language": lang }),
          "x-api-client-name": "open-booking-page",
        },
        version: packageJson.version,
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
    },
  );

  const deleteBooking = () => id && cancelBookingMutation({ variables: { bookingId: id } });

  return deleteBooking;
};
