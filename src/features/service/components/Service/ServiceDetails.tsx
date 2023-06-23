import React from "react";
import { ReactNode } from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { SkeletonBox } from "components/layout/SkeletonBox";
import ReactMarkdown from "react-markdown";
import { useRecoilValue } from "recoil";
import rehypeRaw from "rehype-raw";
import { serviceAtom } from "state/atoms/service";
import styled, { css } from "styled-components";
import { IconCreditCard, IconMapPin, IconUser } from "@tabler/icons";

const StyledMD = styled.div`
  .md-wrapper {
    font-size: 0.8125rem;
    line-height: 1.25rem;

    ${({ theme }) => {
      const color = theme.colors.primary;
      return css`
        a,
        a:visited {
          color: ${color};
        }
      `;
    }}
  }
`;

interface DetailsRowProps {
  name: string;
  value: string | null;
  icon: ReactNode;
}

const IconWrapper = styled.div`
  height: 21px;
  margin-right: 4px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.dark};
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

const DetailsRow: React.FC<DetailsRowProps> = ({ name, value, icon }) => {
  return (
    <Row mb={0.5} w="100%" jc="flex-start" ai="flex-start">
      <IconWrapper>{icon}</IconWrapper>
      <Box ml={0.5} w="100%">
        {value === null ? (
          <SkeletonBox w="100%" h="12px" style={{ minWidth: "-webkit-fill-available" }} />
        ) : (
          <Typography typographyType="body" weight="700" displayType="contents">
            {value}
          </Typography>
        )}
      </Box>
    </Row>
  );
};

const ServiceDetails = () => {
  const serviceData = useRecoilValue(serviceAtom);

  const title =
    serviceData === undefined ? (
      <SkeletonBox h="25px" w="100%" />
    ) : (
      <Typography typographyType="h2" as="h2" displayType="contents">
        {serviceData.title}
      </Typography>
    );

  const description =
    serviceData === undefined ? (
      <>
        <SkeletonBox mt={1.75} h="12px" w="100%" />
        <SkeletonBox mt={0.5} h="12px" w="100%" />
        <SkeletonBox mt={0.5} h="12px" w="100%" />
        <SkeletonBox mt={0.5} h="12px" w="100%" />
      </>
    ) : (
      <StyledMD>
        <ReactMarkdown className="md-wrapper" rehypePlugins={[rehypeRaw]} children={serviceData.description} />
      </StyledMD>
    );

  return (
    <>
      {title}
      {description}
      <Column ai="flex-start">
        {serviceData && serviceData.price > 0 && (
          <DetailsRow
            name="Payment"
            value={
              serviceData === undefined
                ? null
                : `${serviceData.price === 0 ? "Free" : `${serviceData.price.toFixed(2)} ${serviceData.currency}`}`
            }
            icon={<IconCreditCard />}
          />
        )}
        {serviceData?.locations[0] && (
          <DetailsRow
            name="Location"
            value={serviceData === undefined ? null : serviceData.locations[0]}
            icon={<IconMapPin />}
          />
        )}
        {serviceData?.hostedBy && serviceData?.hostedBy !== "-" && (
          <DetailsRow
            name="Hosted by"
            value={serviceData === undefined ? null : serviceData.hostedBy}
            icon={<IconUser />}
          />
        )}
      </Column>
    </>
  );
};

export default ServiceDetails;
