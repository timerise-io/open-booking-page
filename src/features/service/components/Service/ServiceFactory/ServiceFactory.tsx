import React from "react";
import { BOOKING_FORM_TYPES } from "models/service";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { ServiceDateMultiselect } from "../ServiceDateMultiselect";
import { ServiceDateRange } from "../ServiceDateRange";
import ServiceDateTime from "../ServiceDateTime/ServiceDateTime";

export const ServiceFactory = () => {
  const service = useRecoilValue(serviceAtom);
  const serviceType = service?.viewConfig.displayType;
  console.log(service);
  if (serviceType === BOOKING_FORM_TYPES.DAYS) {
    return <ServiceDateTime />;
  } else if (serviceType === BOOKING_FORM_TYPES.CALENDAR) {
    if (service?.viewConfig?.calendar?.multiSelect) {
      return <ServiceDateMultiselect />;
    }
    return <ServiceDateRange />;
  }

  return null;
};
