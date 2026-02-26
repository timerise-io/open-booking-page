import { useEffect } from "react";
import { useLangParam } from "features/i18n/useLangParam";
import { useProjectState } from "features/project/hooks/useProject";
import { useServiceSlotsState, useServiceState } from "features/service/hooks/useService";
import { isNetworkError } from "helpers/functions";
import { useParams } from "react-router-dom";
import { LOADERS, useBookingStore, useErrorStore, useUiStore } from "state/stores";
import { useSubscription } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { BookingQueryResult, BookingQueryVariables } from "../api/queries/models";
import { GET_BOOKING } from "../api/queries/queries";
import { BOOKING_SUBSCRIPTION } from "../api/subscriptions/booking";

export const useBookingSubscription = (bookingId: string, lang: string | null) => {
  const setBooking = useBookingStore((state) => state.setBooking);
  const setServiceLoader = useUiStore((state) => state.setLoader);
  const setBookingError = useErrorStore((state) => state.setBookingError);

  const { loading, data, error } = useSubscription<BookingQueryResult, BookingQueryVariables>(BOOKING_SUBSCRIPTION, {
    variables: {
      bookingId,
    },
    context: {
      headers: {
        ...(lang && { "Accept-Language": lang }),
        "x-api-client-name": "open-booking-page",
      },
      version: packageJson.version,
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
    if (data?.booking) {
      setBooking(data.booking);
      setBookingError(null);
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
  useBookingSubscription(id!, lang);
  const bookingValue = useBookingStore((state) => state.booking);
  const serviceValue = useBookingStore((state) => state.service);
  useServiceState(bookingValue?.service.serviceId ?? "", lang);
  useServiceSlotsState(bookingValue?.service.serviceId ?? "");
  useProjectState(serviceValue?.project.projectId ?? "", lang);
};
