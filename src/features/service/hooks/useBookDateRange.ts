import { useEffect } from "react";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBookingStore, useFilterStore } from "state/stores";
import { useMutation } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { BookDateRangeMutationRespons, BookDateRangeMutationVariables } from "../api/mutations/models";
import { BOOK_DATE_RANGE } from "../api/mutations/mutations";
import { FORM_VALIDATION_ERRORS } from "./formErrors";

export const useBookDateRange = () => {
  const filters = useFilterStore((state) => state.slotsFilters);
  const setFilters = useFilterStore((state) => state.setSlotsFilters);
  const setSelectedSlot = useBookingStore((state) => state.setSelectedSlot);
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());
  const lang = useLangParam();

  const [bookDateRangeMutation, { data, loading, error }] = useMutation<
    BookDateRangeMutationRespons,
    BookDateRangeMutationVariables
  >(BOOK_DATE_RANGE, {
    context: {
      headers: {
        ...(lang && { "Accept-Language": lang }),
        "x-api-client-name": "open-booking-page",
      },
      version: packageJson.version,
    },
  });

  useEffect(() => {
    if (data?.bookingCreate.bookingId) {
      const queryString = createSearchParams(urlSearchParams).toString();
      const path = getPath({
        url: PAGES.BOOKING,
        params: { id: data.bookingCreate.bookingId },
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

  return { bookDateRangeMutation, loadingDateRange: loading, errorDateRange: error?.message };
};
