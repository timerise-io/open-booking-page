import React, { useContext, useEffect } from "react";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { GTMContext } from "features/analytics/contexts/GTMContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { headerSelector } from "state/selectors/headerSelector";

const ServiceHeaders = () => {
  const icon = useRecoilValue(headerSelector)?.logoUrl;
  const service = useRecoilValue(serviceAtom);
  const { init: analyticsInit, send } = useContext(AnalyticsContext);
  const { init, action } = useContext(GTMContext);

  useEffect(() => {
    if (service?.project?.googleTagId) {
      init(service.project.googleTagId);
    }

    if (service?.project?.googleAnalyticsId && !service?.project?.googleTagId) {
      analyticsInit(service.project.googleAnalyticsId);
      send({ event: "booking", action: "view" });
    }
  }, [action, analyticsInit, init, service?.project?.googleAnalyticsId, service?.project?.googleTagId, send]);

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
