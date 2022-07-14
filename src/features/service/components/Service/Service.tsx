import {
  ContentWithDetails,
  DetailsSection,
  ContentSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import ServiceDateTime from "./ServiceDateTime/ServiceDateTime";
import BookService from "./BookService";
import { useService } from "features/service/hooks/useService";
import ServiceDetails from "./ServiceDetails";
import ServiceImageCarousel from "./ServiceImageCarousel";

const ServiceHook = () => {
  useService();
  return null;
};

const Service = () => {
  return (
    <>
      <ServiceHook />
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
          <BookService />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Service;
