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

export type BookingStatus =
  | "NEW"
  | "RENEWED"
  | "ACCEPTED"
  | "CONFIRMED"
  | "CANCELED";

export type PaymentStatus =
  | "NEW"
  | "REQUIRES_PAYMENT_METHOD"
  | "REQUIRES_CONFIRMATION"
  | "REQUIRES_ACTION"
  | "PROCESSING"
  | "SUCCEEDED"
  | "CANCELED";

export interface Booking {
  bookingId: string;
  shortId: string;
  service: {
    serviceId: string;
    spaces: Array<Space> | null;
  };
  dateTimeFrom: string;
  status: BookingStatus;
  createdAt: string;
  qrUrl: string;
  iCalUrl: string;
  paymentLink: string | null;
  paymentStatus: PaymentStatus | null;
}
