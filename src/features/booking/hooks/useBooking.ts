import { useQuery } from "@apollo/client";
import { useLangParam } from "features/i18n/useLangParam";
import { useProjectState } from "features/project/hooks/useProject";
import { useServiceState } from "features/service/hooks/useService";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { loaderAtom, LOADERS } from "state/atoms/loader";
import { serviceAtom } from "state/atoms/service";
import {
  BookingQueryResult,
  BookingQueryVariables,
} from "../api/queries/models";
import { GET_BOOKING } from "../api/queries/queries";

export const useBookingState = (bookingId: string) => {
  const navigate = useNavigate();
  const setBooking = useSetRecoilState(bookingAtom);
  const setServiceLoader = useSetRecoilState(loaderAtom(LOADERS.BOOKING));

  const { loading, data, error, startPolling, stopPolling } = useQuery<
    BookingQueryResult,
    BookingQueryVariables
  >(GET_BOOKING, {
    fetchPolicy: "no-cache",
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
    },
    variables: {
      bookingId,
    },
  });

  useEffect(() => {
    startPolling(2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setServiceLoader(loading);
  }, [loading, setServiceLoader]);
};

export const useBooking = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  useBookingState(id!);
  const bookingValue = useRecoilValue(bookingAtom);
  const serviceValue = useRecoilValue(serviceAtom);
  useServiceState(bookingValue?.service.serviceId ?? "", lang);
  useProjectState(serviceValue?.project.projectId ?? "");
};
