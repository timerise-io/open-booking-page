import { useQuery, useSubscription } from "@apollo/client";
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
import { BOOKING_SUBSCRIPTION } from "../api/subscriptions/booking";

export const useBookingSubscription = (bookingId: string) => {
  const navigate = useNavigate();
  const setBooking = useSetRecoilState(bookingAtom);
  const setServiceLoader = useSetRecoilState(loaderAtom(LOADERS.BOOKING));

  const { loading, data, error } = useSubscription<
    BookingQueryResult,
    BookingQueryVariables
  >(BOOKING_SUBSCRIPTION, {
    fetchPolicy: "no-cache",
    variables: {
      bookingId,
    },
  });

  console.log(loading, data, error);

  useEffect(() => {
    if (data && data.booking) {
      const { booking } = data;
      setBooking({ ...booking });
    }
  }, [data, setBooking]);

  useEffect(() => {
    if (error || data?.booking === null) {
      navigate("/");
    }
  }, [error, navigate, data]);

  useEffect(() => {
    setServiceLoader(loading);
  }, [loading, setServiceLoader]);
};

export const useBooking = () => {
  const { id } = useParams<{ id: string }>();
  useBookingSubscription(id!);
  const bookingValue = useRecoilValue(bookingAtom);
  const serviceValue = useRecoilValue(serviceAtom);
  useServiceState(bookingValue?.service.serviceId ?? "");
  useProjectState(serviceValue?.project.projectId ?? "");
};
