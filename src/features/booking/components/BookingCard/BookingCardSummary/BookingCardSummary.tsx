import React, { ReactNode } from "react";
import {
  IconCalendarEvent,
  IconCircleCheck,
  IconCircleX,
  IconMailForward,
} from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { Typography } from "components/Typography";
import { BookingStatus } from "models/booking";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { StyledColumn } from "./BookingCardSummary.styled";
import BookingCardSummaryNew from "./BookingCardSummaryNew";
import BookingCardSummaryConfirmed from "./BookingCardSummaryConfirmed";
import BookingCardTitle from "./BookingCardTitle";

interface BookingCardSummaryProps {
  status: BookingStatus;
  dateTimeFrom: string;
}

const BookingCardSummary: React.FC<BookingCardSummaryProps> = ({
  status,
  dateTimeFrom,
}) => {
  const booking = useRecoilValue(bookingAtom);

  return (
    <StyledColumn mb={5}>
      <BookingCardTitle
        dateTimeFrom={dateTimeFrom}
        status={status}
        paymentLink={booking?.paymentLink ?? ""}
        paymentStatus={booking?.paymentStatus ?? null}
      />
      {(status === "CONFIRMED" ||
        status === "ACCEPTED" ||
        (status !== "CANCELED" && booking?.paymentStatus === "SUCCEEDED")) &&
        booking && (
          <BookingCardSummaryConfirmed
            iCalUrl={booking.iCalUrl}
            qrUrl={booking.qrUrl}
            spaces={booking.service?.spaces ?? []}
          />
        )}
      {booking && booking.status === "NEW" && !booking.paymentLink && (
        <BookingCardSummaryNew serviceId={booking.service.serviceId} />
      )}
    </StyledColumn>
  );
};

export default BookingCardSummary;
