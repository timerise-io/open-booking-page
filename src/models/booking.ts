export enum SPACE_PROVIDER {
  AMAZON_CHIME = "AMAZON_CHIME",
  FACEBOOK_SPACES = "FACEBOOK_SPACES",
  GOOGLE_MEET = "GOOGLE_MEET",
  GOTO_MEETING = "GOTO_MEETING",
  JOIN_ME = "JOIN_ME",
  SKYPE = "SKYPE",
  TEAMS = "TEAMS",
  MESSENGER = "MESSENGER",
  WEBEX = "WEBEX",
  WHEREBY = "WHEREBY",
  ZOHO_MEETING = "ZOHO_MEETING",
  ZOOM = "ZOOM",
  OTHER = "OTHER",
}

export interface Space {
  url: string;
  title: string | null;
  spaceId: string;
  instructions: string | null;
  provider: SPACE_PROVIDER;
}

export type BookingStatus = "NEW" | "ACCEPTED" | "CONFIRMED" | "CANCELED";

export type PaymentStatus = "NEW" | "PROCESSING" | "SUCCEEDED" | "CANCELED";

export interface Booking {
  bookingId: string;
  shortId: string;
  service: {
    serviceId: string;
    spaces: Array<Space> | null;
  };
  dateTimeFrom: string;
  dateTimeTo: string;
  status: BookingStatus;
  createdAt: string;
  qrUrl: string;
  iCalUrl: string;
  paymentLink: string | null;
  paymentStatus: PaymentStatus | null;
  slots: Array<{
    dateTimeFrom: string;
    dateTimeTo: string;
  }> | null;
  locations: Array<{ locationId: string; title: string }>;
}
