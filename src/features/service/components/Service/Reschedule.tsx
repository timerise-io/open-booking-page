import { useMemo } from "react";
import { BookingNotFound, ServiceNotFound } from "components/errors";
import {
  ContentSection,
  ContentWithDetails,
  DetailsSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { useBooking } from "features/booking/hooks/useBooking";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { BOOKING_FORM_TYPES } from "models/service";
import { useBookingStore, useErrorStore } from "state/stores";
import RescheduleService from "./RescheduleService/RescheduleService";
import { ServiceDateEvent } from "./ServiceDateEvent";
import { ServiceDateRange } from "./ServiceDateRange";
import ServiceDateTime from "./ServiceDateTime/ServiceDateTime";
import ServiceDetails from "./ServiceDetails";
import ServiceImageCarousel from "./ServiceImageCarousel";
import { ServiceMultiDateEvent } from "./ServiceMultiDateEvent";

const BookingHook = () => {
  useBooking();
  return null;
};

const Reschedule = () => {
  const service = useBookingStore((state) => state.service);
  const bookingError = useErrorStore((state) => state.bookingError);
  const serviceError = useErrorStore((state) => state.serviceError);
  const serviceType = service?.viewConfig.displayType;

  const { isEmbeddedPage } = useIsEmbeddedPage();

  // useMemo must be called before any early returns
  const getService = useMemo(() => {
    if (serviceType === BOOKING_FORM_TYPES.DAYS) {
      return <ServiceDateTime />;
    } else if (serviceType === BOOKING_FORM_TYPES.CALENDAR) {
      return <ServiceDateRange />;
    } else if (serviceType === BOOKING_FORM_TYPES.LIST) {
      return <ServiceDateEvent />;
    } else if (serviceType === BOOKING_FORM_TYPES.MULTILIST) {
      return <ServiceMultiDateEvent />;
    }
  }, [serviceType]);

  // Show error if present
  if (bookingError) {
    return (
      <ContentWithDetails>
        <ContentSection>
          <BookingNotFound error={bookingError} />
        </ContentSection>
      </ContentWithDetails>
    );
  }

  if (serviceError) {
    return (
      <ContentWithDetails>
        <ContentSection>
          <ServiceNotFound error={serviceError} />
        </ContentSection>
      </ContentWithDetails>
    );
  }

  return (
    <>
      <BookingHook />
      <ContentWithDetails>
        {!isEmbeddedPage && (
          <DetailsSection>
            {service?.images[0] && (
              <SliderWrapper>
                <ServiceImageCarousel />
              </SliderWrapper>
            )}
            <DetailsTextWrapper>
              <ServiceDetails />
            </DetailsTextWrapper>
          </DetailsSection>
        )}
        <ContentSection>
          {getService}
          {service && <RescheduleService />}
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Reschedule;
