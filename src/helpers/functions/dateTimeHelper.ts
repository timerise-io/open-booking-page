import moment from "moment";

export const isSameDay = ({ dateTimeFrom, dateTimeTo }: { dateTimeFrom: string; dateTimeTo: string }): boolean => {
  return moment(dateTimeFrom).format("DD-MM-YYYY") === moment(dateTimeTo).format("DD-MM-YYYY");
};
