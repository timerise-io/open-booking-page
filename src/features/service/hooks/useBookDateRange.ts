import { useEffect } from "react";
import { VERSION } from "enums";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedSlot } from "state/atoms/selectedSlot";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { useMutation } from "@apollo/client";
import { BookDateRangeMutationRespons, BookDateRangeMutationVariables } from "../api/mutations/models";
import { BOOK_DATE_RANGE } from "../api/mutations/mutations";

export const useBookDateRange = () => {
  const [filters, setFilters] = useRecoilState(slotsFiltersAtom);
  const setSelectedSlot = useSetRecoilState(selectedSlot);
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
      navigate(
        getPath({
          url: `${PAGES.BOOKING}:query`,
          params: {
            id: data.bookingCreate.bookingId,
            query: `?${createSearchParams(urlSearchParams).toString()}`,
          },
        }),
      );
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
