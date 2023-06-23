import {
  ContentSection,
  ContentWithDetails,
  DetailsSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { useBooking } from "features/booking/hooks/useBooking";
import RescheduleService from "./RescheduleService/RescheduleService";
import ServiceDateTime from "./ServiceDateTime/ServiceDateTime";
import ServiceDetails from "./ServiceDetails";
import ServiceImageCarousel from "./ServiceImageCarousel";

const BookingHook = () => {
  useBooking();
  return null;
};

const Reschedule = () => {
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
          <ServiceDateTime />
          <RescheduleService />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Reschedule;
