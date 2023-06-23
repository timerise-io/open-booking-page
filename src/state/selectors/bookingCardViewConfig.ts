import { selector } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";

export const bookingCardViewConfig = selector({
  key: "bookingCardViewConfig",
  get: ({ get }) => {
    const booking = get(bookingAtom);
    const service = get(serviceAtom);

    if (!booking || !service) return null;

    const { status, paymentStatus } = booking;
    const { bookingStatus: bookingStatusConfig, paymentStatus: paymentStatusConfig } = service.viewConfig;

    const usePaymentFlow = !!(paymentStatus !== null && !paymentStatusConfig[paymentStatus]?.actions?.hide);

    if (usePaymentFlow && !!paymentStatus) {
      return { ...paymentStatusConfig[paymentStatus] };
    }
    return { ...bookingStatusConfig[status] };
  },
});
