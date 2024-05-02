import { BOOKING_FORM_TYPES, Service } from "models/service";

interface GetServiceConfigByType {
  ({ service }: { service: Service }): Service["viewConfig"]["days" | "list" | "calendar"];
}

export const getServiceConfigByType: GetServiceConfigByType = ({ service }) => {
  const serviceType = service?.viewConfig?.displayType;

  const types = {
    [BOOKING_FORM_TYPES.DAYS]: "days",
    [BOOKING_FORM_TYPES.CALENDAR]: "calendar",
    [BOOKING_FORM_TYPES.LIST]: "list",
  } as const;

  return service.viewConfig[types[serviceType]];
};
