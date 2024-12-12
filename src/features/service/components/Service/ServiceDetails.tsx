import React, { useContext, useEffect } from "react";
import { ReactNode } from "react";
import { ContextSelect } from "components/ContextSelect";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { Booking } from "models/booking";
import { Service } from "models/service";
import ReactMarkdown from "react-markdown";
import { useRecoilState, useRecoilValue } from "recoil";
import rehypeRaw from "rehype-raw";
import { bookingAtom } from "state/atoms/booking";
import { locationAtom } from "state/atoms/location";
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

const StyledDetailsRowSelect = styled(Row)`
  width: 100%;

  & > div {
    & > button {
      border: none;
      background: transparent;
      padding: 0;

      & > div {
        width: calc(100% - 40px);

        & > p {
          font-weight: 700;
        }
      }
    }
  }
}
`;

const StyledContextSelect = styled(ContextSelect)`
  width: calc(100% - 20px);
}`;

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

interface LocationDetailsRowProps {
  booking?: Booking;
  location?: string;
  serviceData?: Service;
  setLocation: (location: string) => void;
  locationsOptions: Record<string, string>;
}

const LocationDetailsRow: React.FC<LocationDetailsRowProps> = ({
  booking,
  location,
  serviceData,
  setLocation,
  locationsOptions,
}) => {
  const hasBookingLocations = booking && booking?.locations?.length;
  const hasServiceLocations = location && serviceData?.serviceLocations?.length;
  const hasOneServiceLocation = serviceData?.serviceLocations?.length === 1;
  const { sendEvent } = useContext(AnalyticsContext);

  if (hasBookingLocations) {
    return <DetailsRow name="Location" value={booking.locations[0].title} icon={<IconMapPin />} />;
  }

  if (hasServiceLocations) {
    if (hasOneServiceLocation) {
      return (
        <DetailsRow
          name="Location"
          value={serviceData === undefined ? null : serviceData.serviceLocations[0].title}
          icon={<IconMapPin />}
        />
      );
    }

    return (
      <StyledDetailsRowSelect>
        <IconWrapper>
          <IconMapPin />
        </IconWrapper>
        <StyledContextSelect
          label={""}
          value={location}
          options={locationsOptions}
          onChange={(value) => {
            setLocation(value as string);
            sendEvent({
              category: "navigation",
              action: "Location Select",
              label: "Change Location",
            });
          }}
        />
      </StyledDetailsRowSelect>
    );
  }

  return null;
};

const ServiceDetails = () => {
  const serviceData = useRecoilValue(serviceAtom);
  const [location, setLocation] = useRecoilState(locationAtom);
  const booking = useRecoilValue(bookingAtom);

  useEffect(() => {
    setLocation(serviceData?.serviceLocations[0]?.locationId ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceData]);

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

  const locationsOptions =
    serviceData?.serviceLocations.reduce((acc, { title, locationId }) => {
      acc[locationId] = title;
      return acc;
    }, {} as Record<string, string>) ?? {};

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
        <LocationDetailsRow
          booking={booking}
          location={location}
          serviceData={serviceData}
          setLocation={setLocation}
          locationsOptions={locationsOptions}
        />
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
