import { useMutation } from "@apollo/client";
import { PAGES } from "pages/constans";
import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import {
  BookSlotMutationRespons,
  BookSlotMutationVariables,
} from "../api/mutations/models";
import { BOOK_SLOT } from "../api/mutations/mutations";
import { useRecoilState, useSetRecoilState } from "recoil";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { selectedSlot } from "state/atoms/selectedSlot";

export const useBookSlot = () => {
  const [filters, setFilters] = useRecoilState(slotsFiltersAtom);
  const setSelectedSlot = useSetRecoilState(selectedSlot);
  const navigate = useNavigate();

  const [bookSlotMutation, { data, loading, error }] = useMutation<
    BookSlotMutationRespons,
    BookSlotMutationVariables
  >(BOOK_SLOT);

  useEffect(() => {
    if (data?.bookingCreate.bookingId) {
      navigate(
        generatePath(PAGES.BOOKING, { id: data.bookingCreate.bookingId })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      setFilters({ ...filters, triggerId: new Date().getTime() });
      setSelectedSlot("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { bookSlotMutation, loading: loading };
};
