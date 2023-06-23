import React from "react";
import { Card } from "components/Card";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import BookingCardBottom from "./BookingCardBottom/BookingCardBottom";
import BookingCardSummary from "./BookingCardSummary/BookingCardSummary";
import ShortId from "./ShortId";

const BookingCardLoader = (
  <Card>
    <Column>
      <Box mt={3.25}>
        <SkeletonBox w="36px" h="36px" />
      </Box>
      <Box mt={2} w="100%">
        <SkeletonBox w="100%" h="26px" />
      </Box>
      <Box mt={3.5} w="100%">
        <SkeletonBox w="100%" h="40px" />
      </Box>
      <Box mt={3.25} w="100%">
        <SkeletonBox w="100%" h="20px" />
      </Box>
    </Column>
  </Card>
);

const BookingCard = () => {
  const bookingValue = useRecoilValue(bookingAtom);

  if (bookingValue === undefined) return BookingCardLoader;

  return (
    <Card padding="8px 20px 20px 20px">
      <ShortId shortId={bookingValue.shortId} />
      <BookingCardSummary status={bookingValue.status} dateTimeFrom={bookingValue.dateTimeFrom} />
      <BookingCardBottom />
    </Card>
  );
};

export default BookingCard;
