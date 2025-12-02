import { useEffect } from "react";
import { VERSION } from "enums";
import { useLangParam } from "features/i18n/useLangParam";
import { useProjectState } from "features/project/hooks/useProject";
import { useServiceState } from "features/service/hooks/useService";
import { isNetworkError } from "helpers/functions";
import { useParams } from "react-router-dom";
import { LOADERS, useBookingStore, useErrorStore, useUiStore } from "state/stores";
import { useSubscription } from "@apollo/client/react";
import { BookingQueryResult, BookingQueryVariables } from "../api/queries/models";
import { GET_BOOKING } from "../api/queries/queries";
import { BOOKING_SUBSCRIPTION } from "../api/subscriptions/booking";

export const useBookingSubscription = (bookingId: string) => {
  const setBooking = useBookingStore((state) => state.setBooking);
  const setServiceLoader = useUiStore((state) => state.setLoader);
  const setBookingError = useErrorStore((state) => state.setBookingError);

  const { loading, data, error } = useSubscription<BookingQueryResult, BookingQueryVariables>(BOOKING_SUBSCRIPTION, {
    variables: {
      bookingId,
    },
    context: {
      version: VERSION.V1,
    },
    onData: ({ client, data }) => {
      if (data.data?.booking) {
        // Update cache directly - propagates to all components
        client.cache.writeQuery({
          query: GET_BOOKING,
          variables: { bookingId },
          data: { booking: data.data.booking },
        });
      }
    },
  });

  useEffect(() => {
    if (data && data.booking) {
      const { booking } = data;
      setBooking({ ...booking });
      setBookingError(null); // Clear error on success
    }
  }, [data, setBooking, setBookingError]);

  useEffect(() => {
    if (error || data?.booking === null) {
      setBookingError({
        type: isNetworkError(error) ? "NETWORK_ERROR" : "BOOKING_NOT_FOUND",
        canRetry: false, // Subscriptions don't support manual retry
      });
    }
  }, [error, data, setBookingError]);

  useEffect(() => {
    setServiceLoader(LOADERS.BOOKING, loading);
  }, [loading, setServiceLoader]);
};

export const useBooking = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  useBookingSubscription(id!);
  const bookingValue = useBookingStore((state) => state.booking);
  const serviceValue = useBookingStore((state) => state.service);
  useServiceState(bookingValue?.service.serviceId ?? "", lang);
  useProjectState(serviceValue?.project.projectId ?? "");
};
