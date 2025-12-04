import { format } from "date-fns";

export const isSameDay = ({ dateTimeFrom, dateTimeTo }: { dateTimeFrom: string; dateTimeTo: string }): boolean => {
  return format(new Date(dateTimeFrom), "dd-MM-yyyy") === format(new Date(dateTimeTo), "dd-MM-yyyy");
};
