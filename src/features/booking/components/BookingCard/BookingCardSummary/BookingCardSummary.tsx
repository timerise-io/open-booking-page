import React from "react";
import { BookingStatus } from "models/booking";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { StyledColumn } from "./BookingCardSummary.styled";
import BookingCardTitle from "./BookingCardTitle";
import { bookingCardViewConfig } from "state/selectors/bookingCardViewConfig";
import BookingCardContent from "./BookingCardContent";
import { Box } from "components/layout/Box";
import Space from "../Space";

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
        showPayButton={!!cardConfig.actions?.pay}
      />
      {!!cardConfig.actions?.spaces && booking.service.spaces && booking.service.spaces.length > 0 && (
      <Box mt={5} w="100%">
        {booking.service.spaces.map((item) => (
        <Space key={item.spaceId} space={item} />
        ))}
      </Box>
      )}
      <BookingCardContent
        iCalUrl={booking.iCalUrl}
        qrUrl={booking.qrUrl}
        showCalendarButton={!!cardConfig.actions?.calendar}
        showQRButton={!!cardConfig.actions?.qr}
      />
    </StyledColumn>
  );
};

export default BookingCardSummary;
