import {
  ContentSection,
  ContentWithDetails,
  DetailsSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { useService } from "features/service/hooks/useService";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import BookService from "./BookService/BookService";
import ServiceDetails from "./ServiceDetails";
import { ServiceFactory } from "./ServiceFactory";
import ServiceImageCarousel from "./ServiceImageCarousel";

const ServiceHook = () => {
  useService();
  return null;
};

const Service = () => {
  const serviceData = useRecoilValue(serviceAtom);

  return (
    <>
      <ServiceHook />
      <ContentWithDetails>
        <DetailsSection>
          {serviceData?.images[0] && (
            <SliderWrapper>
              <ServiceImageCarousel />
            </SliderWrapper>
          )}
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
