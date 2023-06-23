import React from "react";
import { ContentSection, ContentWithDetails, DetailsSection } from "components/layout/ContentWithDetails";
import { useBooking } from "../hooks/useBookingSubscription";
import BookingCard from "./BookingCard/BookingCard";
import ServiceDetailsForBookingWrapper from "./ServiceDetailsForBookingWrapper";

const BookingHook = () => {
  useBooking();
  return null;
};

const Booking = () => {
  return (
    <>
      <BookingHook />
      <ContentWithDetails>
        <DetailsSection>
          <ServiceDetailsForBookingWrapper />
        </DetailsSection>
        <ContentSection>
          <BookingCard />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Booking;
