import { create } from "zustand";

export interface ErrorInfo {
  type: "SERVICE_NOT_FOUND" | "BOOKING_NOT_FOUND" | "NETWORK_ERROR";
  canRetry: boolean;
  refetch?: () => void;
}

interface ErrorState {
  serviceError: ErrorInfo | null;
  bookingError: ErrorInfo | null;
  setServiceError: (error: ErrorInfo | null) => void;
  setBookingError: (error: ErrorInfo | null) => void;
  clearErrors: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  serviceError: null,
  bookingError: null,
  setServiceError: (error) => set({ serviceError: error }),
  setBookingError: (error) => set({ bookingError: error }),
  clearErrors: () => set({ serviceError: null, bookingError: null }),
}));
