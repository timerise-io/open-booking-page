import React, { useContext, useEffect } from "react";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useBookingStore } from "state/stores";

const ServiceHeaders = () => {
  const service = useBookingStore((state) => state.service);
  const icon = service?.project?.logoUrl;
  const { init, send } = useContext(AnalyticsContext);

  useEffect(() => {
    if (service?.project?.googleTagId) {
      init(service.project.googleTagId);
      send({ event: "booking", action: "view" });
    }
  }, [init, service?.project?.googleTagId, send]);

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
