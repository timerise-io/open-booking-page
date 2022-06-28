import {
  ContentWithDetails,
  DetailsSection,
  ContentSection,
  DetailsTextWrapper,
} from "components/layout/ContentWithDetails";
import ServiceDateTime from "./ServiceDateTime/ServiceDateTime";
import BookService from "./BookService";
import { useService } from "features/service/hooks/useService";
import ServiceDetails from "./ServiceDetails";

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
