import { useEffect } from "react";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBookingStore, useFilterStore } from "state/stores";
import { useMutation } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { BookSlotMutationRespons, BookSlotMutationVariables } from "../api/mutations/models";
import { BOOK_SLOT } from "../api/mutations/mutations";
import { FORM_VALIDATION_ERRORS } from "./formErrors";

export const useBookSlot = () => {
  const filters = useFilterStore((state) => state.slotsFilters);
  const setFilters = useFilterStore((state) => state.setSlotsFilters);
  const setSelectedSlot = useBookingStore((state) => state.setSelectedSlot);
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());
  const lang = useLangParam();

  const [bookSlotMutation, { data, loading, error }] = useMutation<BookSlotMutationRespons, BookSlotMutationVariables>(
    BOOK_SLOT,
    {
      context: {
        headers: {
          ...(lang && { "Accept-Language": lang }),
          "x-api-client-name": "open-booking-page",
        },
        version: packageJson.version,
      },
      update: (cache, { data }) => {
        if (data?.bookingCreate.bookingId) {
          // Evict slots to trigger refetch (availability changed after booking)
          cache.evict({ fieldName: "slots" });
          cache.gc();
        }
      },
    },
  );

  useEffect(() => {
    if (data?.bookingCreate.bookingId) {
      const queryString = createSearchParams(urlSearchParams).toString();
      const path = getPath({
        url: PAGES.BOOKING,
        params: { id: data.bookingCreate.bookingId },
      });
      navigate(queryString ? `${path}?${queryString}` : path);
    }
  }, [data?.bookingCreate.bookingId, navigate, PAGES, urlSearchParams]);

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

  return { bookSlotMutation, loading, error: error?.message };
};
