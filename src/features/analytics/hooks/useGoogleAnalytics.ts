import { useState } from "react";
import ReactGA from "react-ga4";
import { GoogleAnalyticsEvent, UseGoogleAnalytics } from "../types";

export const useGoogleAnalytics: UseGoogleAnalytics = () => {
  const [trackingId, setTrackingId] = useState<string>("");

  const init = (id: string) => {
    if (!id) {
      throw new Error("Google Analytics tracking ID is required");
    }
    ReactGA.initialize(id);
    setTrackingId(id);
    console.log(`Google Analytics initialized with tracking ID: ${id}`);
  };

  const sendEvent = (event: GoogleAnalyticsEvent) => {
    if (!trackingId) {
      throw new Error("Google Analytics is not initialized");
    }
    ReactGA.event(event);
    console.log(`Google Analytics event sent: ${JSON.stringify(event)}`);
  };

  const send = (path: any) => {
    if (!trackingId) {
      throw new Error("Google Analytics is not initialized");
    }
    ReactGA.send(path);
    console.log(`Google Analytics pageview sent: ${path}`);
  };

  return {
    init,
    sendEvent,
    send,
  };
};
