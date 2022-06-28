import { Booking } from "models/booking";

export interface BookingQueryVariables {
  bookingId: string;
}

export interface BookingQueryResult {
  booking?: Booking;
}
