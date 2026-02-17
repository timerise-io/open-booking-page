import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useBookingStore } from "state/stores";

const ServiceHeaders = () => {
  const service = useBookingStore((state) => state.service);
  const icon = service?.project?.logoUrl;

  if (service === undefined) return null;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content={service.description} />
        {icon && <link rel="icon" type="image" href={icon} />}
      </Helmet>
    </HelmetProvider>
  );
};

export default ServiceHeaders;
