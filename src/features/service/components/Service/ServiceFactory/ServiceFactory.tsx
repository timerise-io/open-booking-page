import React from "react";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { BOOKING_FORM_TYPES } from "models/service";
import ServiceDateTime from "../ServiceDateTime/ServiceDateTime";
import { ServiceDateRange } from "../ServiceDateRange";

export const ServiceFactory = () => {
  const service = useRecoilValue(serviceAtom);
  const serviceType = service?.viewConfig.displayType;

  if (serviceType === BOOKING_FORM_TYPES.DAYS) {
    return <ServiceDateTime/>;
  } else if (serviceType === BOOKING_FORM_TYPES.CALENDAR) {
    return  <ServiceDateRange/>;
  }

  return null;
};
