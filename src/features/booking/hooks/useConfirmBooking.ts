import { useEffect } from "react";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { ConfirmBookingMutationResult, ConfirmBookingMutationVariables } from "../api/mutations/models";
import { CONFIRM_BOOKING } from "../api/mutations/mutations";

export const useConfirmBooking = (bookingId: string) => {
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();
  const lang = useLangParam();

  const [confirmBooking, { data, loading, error }] = useMutation<
    ConfirmBookingMutationResult,
    ConfirmBookingMutationVariables
  >(CONFIRM_BOOKING, {
    context: {
      headers: {
        ...(lang && { "Accept-Language": lang }),
        "x-api-client-name": "open-booking-page",
      },
      version: packageJson.version,
    },
  });

  useEffect(() => {
    confirmBooking({ variables: { bookingId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!error) {
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!data && !loading) {
      navigate(getPath({ url: PAGES.BOOKING, params: { id: bookingId } }));
    }
  }, [bookingId, data, navigate, loading, PAGES]);
};
