export const booking = {
  bookingId: "BKG_abc123xyz",
  shortId: "ABC123",
  service: {
    serviceId: "SVC_main456",
    spaces: null,
  },
  dateTimeFrom: "2024-01-15T09:00:00.000Z",
  dateTimeTo: "2024-01-15T10:00:00.000Z",
  status: "ACCEPTED" as const,
  createdAt: "2024-01-10T14:30:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/ABC123.png",
  iCalUrl: "https://api.timerise.io/ical/ABC123.ics",
  paymentLink: null,
  paymentStatus: null,
  slots: null,
  locations: [],
};

export const bookingNew = {
  bookingId: "BKG_new789",
  shortId: "NEW789",
  service: {
    serviceId: "SVC_main456",
    spaces: null,
  },
  dateTimeFrom: "2024-01-16T14:00:00.000Z",
  dateTimeTo: "2024-01-16T15:00:00.000Z",
  status: "NEW" as const,
  createdAt: "2024-01-11T10:00:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/NEW789.png",
  iCalUrl: "https://api.timerise.io/ical/NEW789.ics",
  paymentLink: null,
  paymentStatus: null,
  slots: null,
  locations: [],
};

export const bookingConfirmed = {
  bookingId: "BKG_conf456",
  shortId: "CONF456",
  service: {
    serviceId: "SVC_main456",
    spaces: null,
  },
  dateTimeFrom: "2024-01-17T11:00:00.000Z",
  dateTimeTo: "2024-01-17T12:00:00.000Z",
  status: "CONFIRMED" as const,
  createdAt: "2024-01-12T09:15:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/CONF456.png",
  iCalUrl: "https://api.timerise.io/ical/CONF456.ics",
  paymentLink: null,
  paymentStatus: null,
  slots: null,
  locations: [],
};

export const bookingCanceled = {
  bookingId: "BKG_cancel789",
  shortId: "CANCEL789",
  service: {
    serviceId: "SVC_main456",
    spaces: null,
  },
  dateTimeFrom: "2024-01-18T16:00:00.000Z",
  dateTimeTo: "2024-01-18T17:00:00.000Z",
  status: "CANCELED" as const,
  createdAt: "2024-01-13T08:00:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/CANCEL789.png",
  iCalUrl: "https://api.timerise.io/ical/CANCEL789.ics",
  paymentLink: null,
  paymentStatus: null,
  slots: null,
  locations: [],
};

export const bookingWithPayment = {
  bookingId: "BKG_pay123",
  shortId: "PAY123",
  service: {
    serviceId: "SVC_paid789",
    spaces: null,
  },
  dateTimeFrom: "2024-01-20T10:00:00.000Z",
  dateTimeTo: "2024-01-20T11:00:00.000Z",
  status: "NEW" as const,
  createdAt: "2024-01-14T12:00:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/PAY123.png",
  iCalUrl: "https://api.timerise.io/ical/PAY123.ics",
  paymentLink: "https://checkout.stripe.com/pay/cs_test_abc123",
  paymentStatus: "NEW" as const,
  slots: null,
  locations: [],
};

export const bookingWithSlots = {
  bookingId: "BKG_slots456",
  shortId: "SLOTS456",
  service: {
    serviceId: "SVC_multi123",
    spaces: null,
  },
  dateTimeFrom: "2024-01-22T09:00:00.000Z",
  dateTimeTo: "2024-01-22T12:00:00.000Z",
  status: "ACCEPTED" as const,
  createdAt: "2024-01-15T11:30:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/SLOTS456.png",
  iCalUrl: "https://api.timerise.io/ical/SLOTS456.ics",
  paymentLink: null,
  paymentStatus: null,
  slots: [
    { dateTimeFrom: "2024-01-22T09:00:00.000Z", dateTimeTo: "2024-01-22T10:00:00.000Z" },
    { dateTimeFrom: "2024-01-22T10:00:00.000Z", dateTimeTo: "2024-01-22T11:00:00.000Z" },
    { dateTimeFrom: "2024-01-22T11:00:00.000Z", dateTimeTo: "2024-01-22T12:00:00.000Z" },
  ],
  locations: [],
};

export const bookingWithLocation = {
  bookingId: "BKG_loc789",
  shortId: "LOC789",
  service: {
    serviceId: "SVC_onsite456",
    spaces: null,
  },
  dateTimeFrom: "2024-01-25T14:00:00.000Z",
  dateTimeTo: "2024-01-25T15:30:00.000Z",
  status: "ACCEPTED" as const,
  createdAt: "2024-01-16T16:45:00.000Z",
  qrUrl: "https://cdn.timerise.io/qr/LOC789.png",
  iCalUrl: "https://api.timerise.io/ical/LOC789.ics",
  paymentLink: null,
  paymentStatus: null,
  slots: null,
  locations: [{ locationId: "LOC_abc123xyz", title: "Main Office" }],
};
