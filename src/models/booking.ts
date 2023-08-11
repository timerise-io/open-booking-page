export type SpaceProvider =
  | "AMAZON_CHIME"
  | "FACEBOOK_SPACES"
  | "GOOGLE_MEET"
  | "GOTO_MEETING"
  | "JOIN_ME"
  | "SKYPE"
  | "TEAMS"
  | "MESSENGER"
  | "WEBEX"
  | "WHEREBY"
  | "ZOHO_MEETING"
  | "ZOOM"
  | "OTHER";
export interface Space {
  url: string;
  title: string | null;
  spaceId: string;
  instructions: string | null;
  provider: SpaceProvider;
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
}
