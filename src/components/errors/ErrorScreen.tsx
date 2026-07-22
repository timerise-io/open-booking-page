import React from "react";
import { ContentSection, ContentWithDetails } from "components/layout/ContentWithDetails";
import type { ErrorInfo } from "state/stores";
import BookingNotFound from "./BookingNotFound";
import NetworkError from "./NetworkError";
import ServiceNotFound from "./ServiceNotFound";

interface ErrorScreenProps {
  error: ErrorInfo;
  notFound: "service" | "booking";
}

/**
 * Full-page error view: network problems render NetworkError,
 * anything else falls back to the given not-found screen.
 */
const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, notFound }) => {
  let content: React.ReactElement;
  if (error.type === "NETWORK_ERROR") {
    content = <NetworkError error={error} />;
  } else if (notFound === "booking") {
    content = <BookingNotFound error={error} />;
  } else {
    content = <ServiceNotFound error={error} />;
  }

  return (
    <ContentWithDetails>
      <ContentSection>{content}</ContentSection>
    </ContentWithDetails>
  );
};

export default ErrorScreen;
