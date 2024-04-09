import { useEffect } from "react";
import { VERSION } from "enums";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { ConfirmBookingMutationResult, ConfirmBookingMutationVariables } from "../api/mutations/models";
import { CONFIRM_BOOKING } from "../api/mutations/mutations";

export const useConfirmBooking = (bookingId: string) => {
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();

  const [confirmBooking, { data, loading, error }] = useMutation<
    ConfirmBookingMutationResult,
    ConfirmBookingMutationVariables
  >(CONFIRM_BOOKING, {
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
    confirmBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!error) {
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!data && loading === false) {
      navigate(getPath({ url: PAGES.BOOKING, params: { id: bookingId } }));
    }
  }, [bookingId, data, navigate, loading, PAGES]);
};
