/**
 * Error messages from the API that indicate form validation failures
 * rather than slot availability issues. When these errors occur,
 * we keep the selected slot instead of resetting the filter state.
 */
export const FORM_VALIDATION_ERRORS: string[] = [
  "booking-already-exists",
  "phone-number-is-not-valid",
  "phone-number-is-not-possible",
  "phone-number-is-too-short",
  "phone-number-is-null",
  "phone-number-in-not-allowed",
  "phone-number-is-blocked",
  "email-address-is-not-valid",
  "email-address-in-not-allowed",
  "email-address-is-blocked",
  "code-is-not-allowed",
  "promo-code-is-not-valid",
];
