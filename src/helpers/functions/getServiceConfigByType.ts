import { BOOKING_FORM_TYPES, Service } from "models/service";

interface GetServiceConfigByType {
  ({ service }: { service: Service }): Service["viewConfig"]["days" | "list" | "calendar" | "multiList" | "preorder"];
}

export const getServiceConfigByType: GetServiceConfigByType = ({ service }) => {
  const serviceType = service?.viewConfig?.displayType;

  const types = {
    [BOOKING_FORM_TYPES.DAYS]: "days",
    [BOOKING_FORM_TYPES.CALENDAR]: "calendar",
    [BOOKING_FORM_TYPES.LIST]: "list",
    [BOOKING_FORM_TYPES.MULTILIST]: "multiList",
    [BOOKING_FORM_TYPES.PREORDER]: "preorder",
  } as const;

  return service.viewConfig[types[serviceType]];
};
