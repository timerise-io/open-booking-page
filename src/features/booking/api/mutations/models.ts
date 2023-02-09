import { BookingStatus } from "models/booking";

export interface ConfirmBookingMutationVariables {
  bookingId: string;
}

export interface ConfirmBookingMutationResult {
  status: BookingStatus;
}

export interface CancelBookingMutationVariables {
  bookingId: string;
}

export interface CancelBookingMutationResult {
  bookingDelete: string;
}

export interface PublishBookingMutationVariables {
  bookingId: string;
}

export interface PublishBookingMutationResult {
  bookingPublish: {
    status: BookingStatus;
  };
}
