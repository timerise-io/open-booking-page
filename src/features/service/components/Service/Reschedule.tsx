import { useBooking } from "features/booking/hooks/useBooking";
import {
  ContentWithDetails,
  DetailsSection,
  ContentSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import ServiceDateTime from "./ServiceDateTime/ServiceDateTime";
import RescheduleService from "./RescheduleService/RescheduleService";
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
