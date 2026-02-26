import { useEffect } from "react";
import { useLangParam } from "features/i18n/useLangParam";
import { useProjectState } from "features/project/hooks/useProject";
import { useServiceSlotsState, useServiceState } from "features/service/hooks/useService";
import { isNetworkError } from "helpers/functions";
import { useParams } from "react-router-dom";
import { LOADERS, useBookingStore, useErrorStore, useUiStore } from "state/stores";
import { useQuery } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { BookingQueryResult, BookingQueryVariables } from "../api/queries/models";
import { GET_BOOKING } from "../api/queries/queries";

export const useBookingState = (bookingId: string, lang: string | null) => {
  const setBooking = useBookingStore((state) => state.setBooking);
  const setServiceLoader = useUiStore((state) => state.setLoader);
  const setBookingError = useErrorStore((state) => state.setBookingError);

  const { loading, data, error, stopPolling, refetch } = useQuery<BookingQueryResult, BookingQueryVariables>(
    GET_BOOKING,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      pollInterval: 10000,
      context: {
        headers: {
          ...(lang && { "Accept-Language": lang }),
          "x-api-client-name": "open-booking-page",
        },
        version: packageJson.version,
      },
      variables: {
        bookingId,
      },
    },
  );

  useEffect(() => {
    if (data?.booking) {
      setBooking(data.booking);
      setBookingError(null);
    }
  }, [data, setBooking, setBookingError]);

  useEffect(() => {
    if (error || data?.booking === null) {
      stopPolling();
      setBookingError({
        type: isNetworkError(error) ? "NETWORK_ERROR" : "BOOKING_NOT_FOUND",
        canRetry: isNetworkError(error),
        refetch,
      });
    }
  }, [error, data, stopPolling, setBookingError, refetch]);

  useEffect(() => {
    setServiceLoader(LOADERS.BOOKING, loading);
  }, [loading, setServiceLoader]);
};

export const useBooking = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  useBookingState(id!, lang);
  const bookingValue = useBookingStore((state) => state.booking);
  const serviceValue = useBookingStore((state) => state.service);
  useServiceState(bookingValue?.service.serviceId ?? "", lang);
  useServiceSlotsState(serviceValue?.serviceId ?? "");
  useProjectState(serviceValue?.project.projectId ?? "", lang);
};
