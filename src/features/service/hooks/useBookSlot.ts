import { useEffect } from "react";
import { VERSION } from "enums";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedSlot } from "state/atoms/selectedSlot";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { useMutation } from "@apollo/client";
import { BookSlotMutationRespons, BookSlotMutationVariables } from "../api/mutations/models";
import { BOOK_SLOT } from "../api/mutations/mutations";

export const useBookSlot = () => {
  const [filters, setFilters] = useRecoilState(slotsFiltersAtom);
  const setSelectedSlot = useSetRecoilState(selectedSlot);
  const navigate = useNavigate();
  const lang = useLangParam();
  const { PAGES } = useIsEmbeddedPage();

  const [bookSlotMutation, { data, loading, error }] = useMutation<BookSlotMutationRespons, BookSlotMutationVariables>(
    BOOK_SLOT,
    {
      context: {
        headers: {
          "x-api-client-name": "booking-page",
        },
        version: VERSION.V1,
      },
    },
  );

  useEffect(() => {
    if (data?.bookingCreate.bookingId) {
      navigate(
        getPath({
          url: `${PAGES.BOOKING}:query`,
          params: {
            id: data.bookingCreate.bookingId,
            query: lang ? `?${createSearchParams({ locale: lang }).toString()}` : "",
          },
        }),
      );
    }
  }, [data?.bookingCreate.bookingId, lang, navigate, PAGES]);

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

  return { bookSlotMutation, loading: loading, error: error?.message };
};
