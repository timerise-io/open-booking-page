import { Column } from "components/layout/Column";
import {
  DetailsTextWrapper,
  SliderWrapper,
} from "components/layout/ContentWithDetails";
import { Row } from "components/layout/Row";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { Typography } from "components/Typography";
import ServiceDetails from "features/service/components/Service/ServiceDetails";
import ServiceImageCarousel from "features/service/components/Service/ServiceImageCarousel";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import styled from "styled-components";

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
  margin-right: 12px;
`;

const SmallServiceName = styled(Typography)`
  margin: 10px 20px 10px 0;
  display: block;
`;

const SmallDetailsRow = styled(Row)`
  width: 100%;
  border-radius: 4px;
  overflow: hidden;

  background-color: ${({ theme }) =>
    theme.colorSchemas.background.primary.color};
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

const fullDetails = (
  <FullDetailsWrapper ai="stretch">
    <SliderWrapper>
      <ServiceImageCarousel />
    </SliderWrapper>
    <DetailsTextWrapper className="text-details">
      <ServiceDetails />
    </DetailsTextWrapper>
  </FullDetailsWrapper>
);

const OpenButton = styled.button`
  all: unset;
  width: fit-content;
  padding: 8px;
  text-decoration: underline;
`;

const SmallDetails = () => {
  const serviceData = useRecoilValue(serviceAtom);
  const { t } = useTranslation(["booking"]);
  const [isOpen, setIsOpen] = useState(false);

  const buttonText = isOpen
    ? t("hide-service-details")
    : t("show-service-details");

  const smallServiceData = serviceData ? (
    <SmallDetailsRow jc="flex-start">
      <SmallDetailsImage src={serviceData.images[0]} alt="service cover" />
      <SmallServiceName typographyType="body" as="h2" displayType="contents">
        {serviceData.title}
      </SmallServiceName>
    </SmallDetailsRow>
  ) : (
    <SkeletonBox style={{ flexGrow: 1 }} />
  );

  return (
    <Column ai="stretch">
      {isOpen ? fullDetails : smallServiceData}
      <Column ai="center">
        <OpenButton onClick={() => setIsOpen(!isOpen)}>
          <Typography typographyType="body" as="span" color="primary">
            {buttonText}
          </Typography>
        </OpenButton>
      </Column>
    </Column>
  );
};

const ServiceDetailsForBookingWrapper = () => {
  return (
    <Wrapper>
      <div className="full-width">{fullDetails}</div>
      <div className="md-width">
        <SmallDetails />
      </div>
    </Wrapper>
  );
};

export default ServiceDetailsForBookingWrapper;
