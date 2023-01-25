import { useMutation } from "@apollo/client";
import { PAGES } from "pages/constans";
import { useEffect } from "react";
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from "react-router-dom";
import {
  BookSlotMutationRespons,
  BookSlotMutationVariables,
} from "../api/mutations/models";
import { BOOK_SLOT } from "../api/mutations/mutations";
import { useRecoilState, useSetRecoilState } from "recoil";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { selectedSlot } from "state/atoms/selectedSlot";
import { useLangParam } from "features/i18n/useLangParam";

export const useBookSlot = () => {
  const [filters, setFilters] = useRecoilState(slotsFiltersAtom);
  const setSelectedSlot = useSetRecoilState(selectedSlot);
  const navigate = useNavigate();
  const lang = useLangParam();

  const [bookSlotMutation, { data, loading, error }] = useMutation<
    BookSlotMutationRespons,
    BookSlotMutationVariables
  >(BOOK_SLOT, {
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
    },
  });

  useEffect(() => {
    if (data?.bookingCreate.bookingId) {
      navigate(
        generatePath(`${PAGES.BOOKING}:query`, {
          id: data.bookingCreate.bookingId,
          query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      const formErrors: string[] = [
        'booking-already-exists', 
        'phone-number-is-not-valid', 
        'phone-number-is-not-possible', 
        'phone-number-is-too-short', 
        'phone-number-is-null', 
        'phone-number-in-not-allowed', 
        'phone-number-is-blocked', 
        'email-address-is-not-valid', 
        'email-address-in-not-allowed', 
        'email-address-is-blocked', 
        'code-is-not-allowed', 
        'promo-code-is-not-valid', 
      ];
      if(!formErrors.includes(error?.message || 'unknown-booking-create-error')) {
        setFilters({ ...filters, triggerId: new Date().getTime() });
        setSelectedSlot("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.message]);

  return { bookSlotMutation, loading: loading, error: error?.message };
};
