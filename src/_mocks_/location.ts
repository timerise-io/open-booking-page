export const location = {
  locationId: "LOC_abc123xyz",
  title: "Main Office",
  description: "Our main office location in the city center",
  address: "123 Main Street, Warsaw, Poland",
  latLng: {
    lat: 52.2297,
    lng: 21.0122,
  },
  workingDays: {
    MONDAY: { timeFrom: "09:00:00", timeTo: "17:00:00" },
    TUESDAY: { timeFrom: "09:00:00", timeTo: "17:00:00" },
    WEDNESDAY: { timeFrom: "09:00:00", timeTo: "17:00:00" },
    THURSDAY: { timeFrom: "09:00:00", timeTo: "17:00:00" },
    FRIDAY: { timeFrom: "09:00:00", timeTo: "17:00:00" },
    SATURDAY: null,
    SUNDAY: null,
  },
};

export const locationMinimal = {
  locationId: "LOC_min456",
  title: "Branch Office",
};

export const locations = [
  location,
  {
    locationId: "LOC_branch789",
    title: "Branch Office",
    description: "Our secondary branch location",
    address: "456 Side Street, Krakow, Poland",
    latLng: {
      lat: 50.0647,
      lng: 19.945,
    },
    workingDays: {
      MONDAY: { timeFrom: "10:00:00", timeTo: "18:00:00" },
      TUESDAY: { timeFrom: "10:00:00", timeTo: "18:00:00" },
      WEDNESDAY: { timeFrom: "10:00:00", timeTo: "18:00:00" },
      THURSDAY: { timeFrom: "10:00:00", timeTo: "18:00:00" },
      FRIDAY: { timeFrom: "10:00:00", timeTo: "16:00:00" },
      SATURDAY: { timeFrom: "10:00:00", timeTo: "14:00:00" },
      SUNDAY: null,
    },
  },
];
