import React from "react";
import { ErrorScreen } from "components/errors";
import { ContentSection, ContentWithDetails, DetailsSection } from "components/layout/ContentWithDetails";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useErrorStore } from "state/stores";
import { useBooking } from "../hooks/useBookingSubscription";
import BookingCard from "./BookingCard/BookingCard";
import ServiceDetailsForBookingWrapper from "./ServiceDetailsForBookingWrapper";

const BookingHook = () => {
  useBooking();
  return null;
};

const Booking = () => {
  const { isEmbeddedPage } = useIsEmbeddedPage();
  const bookingError = useErrorStore((state) => state.bookingError);

  // Show error if present
  if (bookingError) {
    return <ErrorScreen error={bookingError} notFound="booking" />;
  }

  return (
    <>
      <BookingHook />
      <ContentWithDetails>
        {!isEmbeddedPage && (
          <DetailsSection>
            <ServiceDetailsForBookingWrapper />
          </DetailsSection>
        )}
        <ContentSection>
          <BookingCard />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Booking;
