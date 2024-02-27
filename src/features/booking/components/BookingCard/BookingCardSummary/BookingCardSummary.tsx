import React, { useEffect, useMemo, useState } from "react";
import { Box } from "components/layout/Box";
import { SPACE_PROVIDER, Space as SpaceModel } from "models/booking";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { bookingCardViewConfig } from "state/selectors/bookingCardViewConfig";
import Space from "../Space";
import BookingCardContent from "./BookingCardContent";
import { StyledColumn } from "./BookingCardSummary.styled";
import BookingCardTitle from "./BookingCardTitle";

interface BookingCardSummaryProps {
  dateTimeFrom: string;
  dateTimeTo: string;
}

const BookingCardSummary: React.FC<BookingCardSummaryProps> = ({ dateTimeFrom, dateTimeTo }) => {
  const cardConfig = useRecoilValue(bookingCardViewConfig);
  const booking = useRecoilValue(bookingAtom);
  const [spaces, setSpaces] = useState<SpaceModel[]>([]);

  const hiddenSpaces = useMemo(() => [SPACE_PROVIDER.GOOGLE_MEET], []);

  useEffect(() => {
    if (booking?.service?.spaces?.length) {
      const filteredSpaces = booking?.service?.spaces?.filter((space) => !hiddenSpaces.includes(space.provider)) ?? [];

      setSpaces(filteredSpaces);
    }
  }, [booking?.service?.spaces, hiddenSpaces]);

  if (!cardConfig || !booking) return null;

  return (
    <StyledColumn mb={5}>
      <BookingCardTitle
        dateTimeFrom={dateTimeFrom}
        dateTimeTo={dateTimeTo}
        paymentLink={booking.paymentLink ?? ""}
        description={cardConfig.description}
        iconUrl={cardConfig.iconUrl}
        showDetails={cardConfig.details}
        title={cardConfig.title}
        showPayButton={!!cardConfig.actions?.pay}
      />
      {!!cardConfig.actions?.spaces && spaces?.length > 0 && (
        <Box mt={5} w="100%">
          {spaces.map((item) => (
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
