import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { headerSelector } from "state/selectors/headerSelector";

const ServiceHeaders = () => {
  const icon = useRecoilValue(headerSelector)?.logoUrl;
  const service = useRecoilValue(serviceAtom);

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
