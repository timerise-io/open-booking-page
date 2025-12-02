import { useEffect } from "react";
import { VERSION } from "enums";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBookingStore, useFilterStore } from "state/stores";
import { useMutation } from "@apollo/client/react";
import { BookDateRangeMutationRespons, BookDateRangeMutationVariables } from "../api/mutations/models";
import { BOOK_DATE_RANGE } from "../api/mutations/mutations";

export const useBookDateRange = () => {
  const filters = useFilterStore((state) => state.slotsFilters);
  const setFilters = useFilterStore((state) => state.setSlotsFilters);
  const setSelectedSlot = useBookingStore((state) => state.setSelectedSlot);
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());

  const [bookDateRangeMutation, { data, loading, error }] = useMutation<
    BookDateRangeMutationRespons,
    BookDateRangeMutationVariables
  >(BOOK_DATE_RANGE, {
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
      version: VERSION.V1,
    },
  });

  useEffect(() => {
    if (data?.bookingCreate.bookingId) {
      const queryString = createSearchParams(urlSearchParams).toString();
      const path = queryString
        ? getPath({
            url: `${PAGES.BOOKING}:query`,
            params: {
              id: data.bookingCreate.bookingId,
              query: `?${queryString}`,
            },
          })
        : getPath({
            url: PAGES.BOOKING,
            params: {
              id: data.bookingCreate.bookingId,
            },
          });
      navigate(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      const formErrors: string[] = [
        "booking-already-exists",
        "phone-number-is-not-valid",
        "phone-number-is-not-possible",
        "phone-number-is-too-short",
        "phone-number-is-null",
        "phone-number-in-not-allowed",
        "phone-number-is-blocked",
        "email-address-is-not-valid",
        "email-address-in-not-allowed",
        "email-address-is-blocked",
        "code-is-not-allowed",
        "promo-code-is-not-valid",
      ];
      if (!formErrors.includes(error?.message || "unknown-booking-create-error")) {
        setFilters({ ...filters, triggerId: new Date().getTime() });
        setSelectedSlot("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.message]);

  return { bookDateRangeMutation, loadingDateRange: loading, errorDateRange: error?.message };
};
