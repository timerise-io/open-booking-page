import React from "react";
import { ContentSection, ContentWithDetails, DetailsSection } from "components/layout/ContentWithDetails";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useBooking } from "../hooks/useBookingSubscription";
import BookingCard from "./BookingCard/BookingCard";
import ServiceDetailsForBookingWrapper from "./ServiceDetailsForBookingWrapper";

const BookingHook = () => {
  useBooking();
  return null;
};

const Booking = () => {
  const { isEmbeddedPage } = useIsEmbeddedPage();

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
