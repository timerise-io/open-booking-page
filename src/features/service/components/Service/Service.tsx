import { ServiceNotFound } from "components/errors";
import {
  ContentSection,
  ContentWithDetails,
  DetailsSection,
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { useService } from "features/service/hooks/useService";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useBookingStore, useErrorStore } from "state/stores";
import BookService from "./BookService/BookService";
import ServiceDetails from "./ServiceDetails";
import { ServiceFactory } from "./ServiceFactory";
import ServiceImageCarousel from "./ServiceImageCarousel";

const ServiceHook = () => {
  useService();
  return null;
};

const Service = () => {
  const serviceData = useBookingStore((state) => state.service);
  const serviceError = useErrorStore((state) => state.serviceError);
  const { isEmbeddedPage } = useIsEmbeddedPage();

  // Show error if present
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
      <ServiceHook />
      <ContentWithDetails>
        {!isEmbeddedPage && (
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
        )}
        <ContentSection>
          <ServiceFactory />
          <BookService />
        </ContentSection>
      </ContentWithDetails>
    </>
  );
};

export default Service;
