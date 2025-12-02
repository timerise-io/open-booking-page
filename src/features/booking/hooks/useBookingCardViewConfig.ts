import { useBookingStore } from "state/stores";
import { PAYMENT_TYPES } from "models/service";

export const useBookingCardViewConfig = () => {
  const booking = useBookingStore((state) => state.booking);
  const service = useBookingStore((state) => state.service);

  if (!booking || !service) return null;

  const { status, paymentStatus } = booking;
  const { bookingStatus: bookingStatusConfig, paymentStatus: paymentStatusConfig } = service.viewConfig;
  const { paymentProviders } = service;

  const usePaymentFlow = !!(
    paymentStatus !== null &&
    !paymentStatusConfig[paymentStatus]?.actions?.hide &&
    paymentProviders?.length &&
    (paymentProviders?.includes(PAYMENT_TYPES.STRIPE) || paymentProviders?.includes(PAYMENT_TYPES.ADYEN))
  );

  if (usePaymentFlow && !!paymentStatus) {
    return { ...paymentStatusConfig[paymentStatus] };
  }
  return { ...bookingStatusConfig[status] };
};
