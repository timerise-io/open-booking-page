import { useEffect } from "react";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBookingStore, useFilterStore } from "state/stores";
import { useMutation } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { RescheduleBookingResponse, RescheduleBookingVariables } from "../api/mutations/models";
import { RESCHEDULE_BOOKING } from "../api/mutations/mutations";
import { FORM_VALIDATION_ERRORS } from "./formErrors";

export const useRescheduleBooking = () => {
  const filters = useFilterStore((state) => state.slotsFilters);
  const setFilters = useFilterStore((state) => state.setSlotsFilters);
  const setSelectedSlot = useBookingStore((state) => state.setSelectedSlot);
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());
  const lang = useLangParam();

  const [rescheduleBookingMutation, { data, loading, error }] = useMutation<
    RescheduleBookingResponse,
    RescheduleBookingVariables
  >(RESCHEDULE_BOOKING, {
    context: {
      headers: {
        ...(lang && { "Accept-Language": lang }),
        "x-api-client-name": "open-booking-page",
      },
      version: packageJson.version,
    },
  });

  useEffect(() => {
    if (data?.bookingReschedule.bookingId) {
      setSelectedSlot("");
      const queryString = createSearchParams(urlSearchParams).toString();
      const path = getPath({
        url: PAGES.BOOKING_CONFIRMATION,
        params: { id: data.bookingReschedule.bookingId },
      });
      navigate(queryString ? `${path}?${queryString}` : path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message ?? "unknown-booking-create-error";
      if (!FORM_VALIDATION_ERRORS.includes(errorMessage)) {
        setFilters({ ...filters, triggerId: new Date().getTime() });
        setSelectedSlot("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.message]);

  return { rescheduleBookingMutation, loading, error: error?.message };
};
