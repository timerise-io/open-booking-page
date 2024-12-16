import React, { PropsWithChildren } from "react";
import { AnalyticsContext } from "./contexts/AnalyticsContext";
import { useGoogleAnalytics } from "./hooks";

export const AnalyticsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const googleAnalytics = useGoogleAnalytics();

  return <AnalyticsContext.Provider value={googleAnalytics}>{children}</AnalyticsContext.Provider>;
};
