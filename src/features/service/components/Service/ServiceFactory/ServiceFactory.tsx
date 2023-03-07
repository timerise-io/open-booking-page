import React from "react";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { BOOKING_FORM_TYPES } from "models/service";
import ServiceDateTime from "../ServiceDateTime/ServiceDateTime";
import { ServiceDateRange } from "../ServiceDateRange";
import { Helmet } from 'react-helmet';

export const ServiceFactory = () => {
  const service = useRecoilValue(serviceAtom);
  const serviceType = service?.viewConfig.dateTimeFormType;
  let serviceComponent;

  const metaTags = (
    <Helmet>
      <title>{`${service?.title} | ${service?.project.title} | Booking page | Timerise`}</title>
      <meta property="og:description" content={`${service?.title} | ${service?.project.title} | Booking page | Timerise`}></meta>
      <meta property="og:image" content={`${service?.images.length ? service.images[0] : ''}`}></meta>
    </Helmet>
  );

  if (serviceType === BOOKING_FORM_TYPES.SLOT) {
    serviceComponent = <ServiceDateTime/>;
  } else if (serviceType === BOOKING_FORM_TYPES.RANGE) {
    serviceComponent = <ServiceDateRange/>;
  }

  return <>{serviceComponent} {metaTags}</>;
};
