import { ContextButton } from "components/ContextButton";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import { useDeleteBooking } from "features/booking/hooks/useDeleteBooking";
import useConfirmation from "features/confirmation/hooks/useConfirmation";
import { useLangParam } from "features/i18n/useLangParam";
import { BookingStatus } from "models/booking";
import { PAGES } from "pages/constans";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import styled from "styled-components";

const Wrapper = styled(Row)`
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
`;

const CanceledBookingCardBottom = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const lang = useLangParam();

  if (bookingValue === undefined) return null;

  return (
    <ContextButton
      colorType="primary"
      onClick={() => {
        navigate(
          generatePath(`${PAGES.SERVICE}:query`, {
            id: bookingValue.service.serviceId,
            query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
          })
        );
      }}
    >
      <Typography
        typographyType="body"
        align="center"
        as="span"
        color="inherit"
        weight="700"
      >
        {t("Go back to booking")}
      </Typography>
    </ContextButton>
  );
};

const AcceptedBookingCardBottom = () => {
  const { t } = useTranslation(["booking"]);
  const deleteBooking = useDeleteBooking();
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const lang = useLangParam();

  const showConfirmation = useConfirmation({
    type: "booking/delete",
    confirmButtonType: "danger",
    onConfirm: () => {
      deleteBooking();
    },
  });

  const handleDelete = () => showConfirmation();

  if (bookingValue === undefined) return null;

  return (
    <>
      <ContextButton
        colorType="primary"
        onClick={() => {
          navigate(
            generatePath(`${PAGES.SERVICE}:query`, {
              id: bookingValue.service.serviceId,
              query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
            })
          );
        }}
      >
        <Typography
          typographyType="body"
          align="center"
          as="span"
          color="inherit"
          weight="700"
        >
          {t("Go back to booking")}
        </Typography>
      </ContextButton>
      <ContextButton colorType="danger" onClick={handleDelete}>
        <Typography
          typographyType="body"
          align="center"
          as="span"
          color="inherit"
          weight="700"
        >
          {t("Cancel booking")}
        </Typography>
      </ContextButton>
    </>
  );
};

const contentPerStatus: Record<BookingStatus, ReactNode> = {
  CONFIRMED: (
    <Wrapper jc="space-between">
      <AcceptedBookingCardBottom />
    </Wrapper>
  ),
  ACCEPTED: (
    <Wrapper jc="space-between">
      <AcceptedBookingCardBottom />
    </Wrapper>
  ),
  NEW: <div></div>,
  RENEWED: <div></div>,
  CANCELED: (
    <Wrapper jc="space-around">
      <CanceledBookingCardBottom />
    </Wrapper>
  ),
};

interface BookingCardBottomProps {
  status: BookingStatus;
}

const BookingCardBottom: React.FC<BookingCardBottomProps> = ({ status }) => {
  return <>{contentPerStatus[status]}</>;
};

export default BookingCardBottom;
