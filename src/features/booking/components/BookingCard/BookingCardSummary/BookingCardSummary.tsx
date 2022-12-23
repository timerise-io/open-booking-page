import React from "react";
import { BookingStatus } from "models/booking";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { StyledColumn } from "./BookingCardSummary.styled";
import BookingCardSummaryNew from "./BookingCardSummaryNew";
import BookingCardSummaryConfirmed from "./BookingCardSummaryConfirmed";
import BookingCardTitle from "./BookingCardTitle";
import { bookingCardViewConfig } from "state/selectors/bookingCardViewConfig";

interface BookingCardSummaryProps {
  status: BookingStatus;
  dateTimeFrom: string;
}

const BookingCardSummary: React.FC<BookingCardSummaryProps> = ({
  status,
  dateTimeFrom,
}) => {
  const cardConfig = useRecoilValue(bookingCardViewConfig);
  const booking = useRecoilValue(bookingAtom);
  console.log(cardConfig);

  if (!cardConfig || !booking) return null;

  return (
    <StyledColumn mb={5}>
      <BookingCardTitle
        dateTimeFrom={dateTimeFrom}
        paymentLink={booking.paymentLink ?? ""}
        description={cardConfig.description}
        iconUrl={cardConfig.iconUrl}
        showDetails={cardConfig.details}
        title={cardConfig.title}
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
