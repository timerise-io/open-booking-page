import {
  ContentWithDetails,
  DetailsSection,
  ContentSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import BookService from "./BookService/BookService";
import { useService } from "features/service/hooks/useService";
import ServiceDetails from "./ServiceDetails";
import ServiceImageCarousel from "./ServiceImageCarousel";
import { ServiceFactory } from "./ServiceFactory";

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
          <ServiceFactory/>
          <BookService />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Service;
