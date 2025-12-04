import React from "react";
import { BOOKING_FORM_TYPES } from "models/service";
import { useBookingStore } from "state/stores";
import { ServiceDateEvent } from "../ServiceDateEvent";
import { ServiceDateRange } from "../ServiceDateRange";
import ServiceDateTime from "../ServiceDateTime/ServiceDateTime";
import { ServiceMultiDateEvent } from "../ServiceMultiDateEvent";

export const ServiceFactory = () => {
  const service = useBookingStore((state) => state.service);
  const serviceType = service?.viewConfig.displayType;

  if (serviceType === BOOKING_FORM_TYPES.DAYS) {
    return <ServiceDateTime />;
  } else if (serviceType === BOOKING_FORM_TYPES.CALENDAR) {
    return <ServiceDateRange />;
  } else if (serviceType === BOOKING_FORM_TYPES.LIST) {
    return <ServiceDateEvent />;
  } else if (serviceType === BOOKING_FORM_TYPES.MULTILIST) {
    return <ServiceMultiDateEvent />;
  }

  return null;
};
