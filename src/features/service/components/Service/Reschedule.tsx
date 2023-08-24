import { useMemo } from "react";
import {
  ContentSection,
  ContentWithDetails,
  DetailsSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { useBooking } from "features/booking/hooks/useBooking";
import { BOOKING_FORM_TYPES } from "models/service";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import RescheduleService from "./RescheduleService/RescheduleService";
import { ServiceDateEvent } from "./ServiceDateEvent";
import { ServiceDateRange } from "./ServiceDateRange";
import ServiceDateTime from "./ServiceDateTime/ServiceDateTime";
import ServiceDetails from "./ServiceDetails";
import ServiceImageCarousel from "./ServiceImageCarousel";

const BookingHook = () => {
  useBooking();
  return null;
};

const Reschedule = () => {
  const service = useRecoilValue(serviceAtom);
  const serviceType = service?.viewConfig.displayType;

  const getService = useMemo(() => {
    if (serviceType === BOOKING_FORM_TYPES.DAYS) {
      return <ServiceDateTime />;
    } else if (serviceType === BOOKING_FORM_TYPES.CALENDAR) {
      return <ServiceDateRange />;
    } else if (serviceType === BOOKING_FORM_TYPES.LIST) {
      return <ServiceDateEvent />;
    }
  }, [serviceType]);

  return (
    <>
      <BookingHook />
      <ContentWithDetails>
        <DetailsSection>
          <SliderWrapper>
            <ServiceImageCarousel />
          </SliderWrapper>
          <DetailsTextWrapper>
            <ServiceDetails />
          </DetailsTextWrapper>
        </DetailsSection>
        <ContentSection>
          {getService}
          <RescheduleService />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Reschedule;
