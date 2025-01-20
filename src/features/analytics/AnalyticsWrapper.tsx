import React, { PropsWithChildren } from "react";
import { AnalyticsContext } from "./contexts/AnalyticsContext";
import { GTMContext } from "./contexts/GTMContext";
import { useGoogleAnalytics, useGoogleTagManager } from "./hooks";

export const AnalyticsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const googleAnalytics = useGoogleAnalytics();
  const googleTagManager = useGoogleTagManager();

  return (
    <GTMContext.Provider value={googleTagManager}>
      <AnalyticsContext.Provider value={googleAnalytics}>{children}</AnalyticsContext.Provider>
    </GTMContext.Provider>
  );
};
