import { BOOKING_FORM_TYPES, Service } from "models/service";
import { TFunction } from "react-i18next";

type GetSubmitButtonText = ({
  selectedSlotValue,
  selectedSlotsValue,
  t,
  serviceConfig,
  service,
}: {
  selectedSlotValue: string;
  selectedSlotsValue: string[];
  t: TFunction<"forms"[]>;
  serviceConfig: Service["viewConfig"]["days" | "list" | "calendar" | "multiList"];
  service: Service;
}) => string;

export const getSubmitButtonText: GetSubmitButtonText = ({
  selectedSlotValue,
  selectedSlotsValue,
  t,
  serviceConfig,
  service,
}) => {
  const textBase = t("book-free-button");
  const isMultiSelect = serviceConfig.multiSelect;
  const isMultiDateList = service.viewConfig.displayType === BOOKING_FORM_TYPES.MULTILIST;
  const serviceName = service.title;

  if (isMultiSelect && selectedSlotsValue.length) return `${textBase} (${selectedSlotsValue.length})`;
  if (selectedSlotValue === "" && !selectedSlotsValue.length) return textBase;
  if (selectedSlotValue !== "" && selectedSlotsValue.length) {
    if (isMultiSelect) return `${textBase} (${selectedSlotsValue.length})`;
    if (isMultiDateList) return `${textBase} ${serviceName}`;
    return `${textBase}: ${selectedSlotValue}`;
  }

  return `${textBase}: ${selectedSlotValue}`;
};
