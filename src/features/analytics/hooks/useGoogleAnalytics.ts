import { useState } from "react";
import ReactGA from "react-ga4";
import { GoogleAnalyticsEvent, UseGoogleAnalytics } from "../types";

export const useGoogleAnalytics: UseGoogleAnalytics = () => {
  const [trackingId, setTrackingId] = useState<string>("");

  const init = (id: string) => {
    if (!id) return;
    ReactGA.initialize(id);
    setTrackingId(id);
  };

  const sendEvent = (event: GoogleAnalyticsEvent) => {
    if (!trackingId) return;
    ReactGA.event(event);
  };

  const send = (path: any) => {
    if (!trackingId) return;
    ReactGA.send(path);
  };

  return {
    init,
    sendEvent,
    send,
  };
};
