import React, { useState } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { DetailsTextWrapper, SliderWrapper } from "components/layout/ContentWithDetails";
import { Row } from "components/layout/Row";
import { SkeletonBox } from "components/layout/SkeletonBox";
import ServiceDetails from "features/service/components/Service/ServiceDetails";
import ServiceImageCarousel from "features/service/components/Service/ServiceImageCarousel";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import styled from "styled-components";
import { IconChevronRight } from "@tabler/icons";

const Wrapper = styled.div`
  width: 100%;
  padding: 0;

  .md-width {
    display: none;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
    .full-width {
      display: none;
    }
    .md-width {
      display: block;
    }
  }
`;

const SmallDetailsImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

const SmallServiceName = styled(Typography)`
  margin: 10px 20px 10px 12px;
  display: block;
`;

const SmallDetailsRow = styled(Row)`
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  min-height: 60px;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    border-radius: 0;
  }
`;

const FullDetailsWrapper = styled(Column)`
  gap: calc(0.5rem * 2.5);

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
    .text-details {
      padding: 0 20px;
    }
  }
`;

const FullDetails = () => {
  const serviceData = useRecoilValue(serviceAtom);

  return (
    <FullDetailsWrapper ai="stretch">
      {serviceData?.images[0] && (
        <SliderWrapper>
          <ServiceImageCarousel />
        </SliderWrapper>
      )}
      <DetailsTextWrapper className="text-details">
        <ServiceDetails />
      </DetailsTextWrapper>
    </FullDetailsWrapper>
  );
};

const OpenButton = styled.button`
  all: unset;
  width: fit-content;
  padding: 8px;
  text-decoration: underline;
  cursor: pointer;
`;

const StyledIconChevronRight = styled(IconChevronRight)`
  margin: 0 12px 0 auto;
`;

const SmallDetails = () => {
  const serviceData = useRecoilValue(serviceAtom);
  const { t } = useTranslation(["booking"]);
  const [isOpen, setIsOpen] = useState(false);

  const smallServiceData = serviceData ? (
    <SmallDetailsRow jc="flex-start" onClick={() => setIsOpen(!isOpen)}>
      {serviceData.images[0] && <SmallDetailsImage src={serviceData.images[0]} alt="service cover" />}
      <SmallServiceName typographyType="body" as="h2" displayType="contents">
        {serviceData.title}
      </SmallServiceName>
      <StyledIconChevronRight size={24} />
    </SmallDetailsRow>
  ) : (
    <SkeletonBox style={{ flexGrow: 1 }} />
  );

  return (
    <Column ai="stretch">
      {isOpen ? <FullDetails /> : smallServiceData}
      {isOpen ? (
        <Column ai="center">
          <OpenButton onClick={() => setIsOpen(!isOpen)}>
            <Typography typographyType="body" as="span" color="primary">
              {t("hide-service-details")}
            </Typography>
          </OpenButton>
        </Column>
      ) : null}
    </Column>
  );
};

const ServiceDetailsForBookingWrapper = () => {
  return (
    <Wrapper>
      <div className="full-width">
        <FullDetails />
      </div>
      <div className="md-width">
        <SmallDetails />
      </div>
    </Wrapper>
  );
};

export default ServiceDetailsForBookingWrapper;
