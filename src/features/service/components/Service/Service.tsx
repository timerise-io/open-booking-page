import {
  ContentSection,
  ContentWithDetails,
  DetailsSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { useService } from "features/service/hooks/useService";
import BookService from "./BookService/BookService";
import ServiceDetails from "./ServiceDetails";
import { ServiceFactory } from "./ServiceFactory";
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
          <ServiceFactory />
          <BookService />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Service;
