import { useEffect } from "react";
import { VERSION } from "enums";
import { useLangParam } from "features/i18n/useLangParam";
import { useProjectState } from "features/project/hooks/useProject";
import { useServiceSlotsState, useServiceState } from "features/service/hooks/useService";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingStore, useUiStore, LOADERS } from "state/stores";
import { useQuery } from "@apollo/client/react";
import { BookingQueryResult, BookingQueryVariables } from "../api/queries/models";
import { GET_BOOKING } from "../api/queries/queries";

export const useBookingState = (bookingId: string) => {
  const navigate = useNavigate();
  const setBooking = useBookingStore((state) => state.setBooking);
  const setServiceLoader = useUiStore((state) => state.setLoader);

  const { loading, data, error, stopPolling } = useQuery<BookingQueryResult, BookingQueryVariables>(GET_BOOKING, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: 10000,
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
      version: VERSION.V1,
    },
    variables: {
      bookingId,
    },
  });

  useEffect(() => {
    if (data && data.booking) {
      const { booking } = data;
      setBooking({ ...booking });
    }
  }, [data, setBooking]);

  useEffect(() => {
    if (error || data?.booking === null) {
      stopPolling();
      navigate("/");
    }
  }, [error, navigate, data, stopPolling]);

  useEffect(() => {
    setServiceLoader(LOADERS.BOOKING, loading);
  }, [loading, setServiceLoader]);
};

export const useBooking = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  useBookingState(id!);
  const bookingValue = useBookingStore((state) => state.booking);
  const serviceValue = useBookingStore((state) => state.service);
  useServiceState(bookingValue?.service.serviceId ?? "", lang);
  useServiceSlotsState(serviceValue?.serviceId ?? "");
  useProjectState(serviceValue?.project.projectId ?? "");
};
