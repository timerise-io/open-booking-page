import { Booking } from "models/booking";
import { ConfirmationType } from "models/confirmation";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { ButtonType } from "models/theme";
import { create } from "zustand";

interface Confirmation {
  type: ConfirmationType;
  confirmButtonType: ButtonType;
  state: "open" | "aborted" | "confirmed";
}

interface BookingState {
  booking: Booking | undefined;
  confirmation: Confirmation | undefined;
  selectedDateRange: { dateTimeFrom: string | null; dateTimeTo: string | null };
  selectedSlot: string;
  selectedSlots: string[];
  serviceSlots: Slot[];
  slots: Slot[];
  service: Service | undefined;

  setBooking: (booking: Booking | undefined) => void;
  setConfirmation: (confirmation: Confirmation | undefined) => void;
  setSelectedDateRange: (range: { dateTimeFrom: string | null; dateTimeTo: string | null }) => void;
  setSelectedSlot: (slot: string) => void;
  setSelectedSlots: (slots: string[]) => void;
  setServiceSlots: (slots: Slot[]) => void;
  setSlots: (slots: Slot[]) => void;
  setService: (service: Service | undefined) => void;

  // Selectors (Computed)
  getSelectedSlotData: () => Slot | undefined;
  getServicePrice: () => { price: number; currency: string } | undefined;
  getServiceSlotsMap: () => Record<string, Record<string, Slot>>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  booking: undefined,
  confirmation: undefined,
  selectedDateRange: { dateTimeFrom: null, dateTimeTo: null },
  selectedSlot: "",
  selectedSlots: [],
  serviceSlots: [],
  slots: [],
  service: undefined,

  setBooking: (booking) => set({ booking }),
  setConfirmation: (confirmation) => set({ confirmation }),
  setSelectedDateRange: (selectedDateRange) => set({ selectedDateRange }),
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
  setSelectedSlots: (selectedSlots) => set({ selectedSlots }),
  setServiceSlots: (serviceSlots) => set({ serviceSlots }),
  setSlots: (slots) => set({ slots }),
  setService: (service) => set({ service }),

  getSelectedSlotData: () => {
    const { selectedSlot, serviceSlots } = get();
    return serviceSlots.find((slot) => slot.dateTimeFrom === selectedSlot);
  },
  getServicePrice: () => {
    const { service } = get();
    if (!service) return undefined;
    return {
      price: service.price,
      currency: service.currency,
    };
  },
  getServiceSlotsMap: () => {
    const { serviceSlots } = get();
    return serviceSlots.reduce(
      (acc, item) => {
        return {
          ...acc,
          [item.dateTimeFrom]: {
            [item.dateTimeTo]: { ...item },
          },
        };
      },
      {} as Record<string, Record<string, Slot>>,
    );
  },
}));
