import { Service } from "models/service";
import { TFunction } from "react-i18next";

type GetSubmitButtonText = ({
  selectedSlotValue,
  selectedSlotsValue,
  t,
  serviceConfig,
}: {
  selectedSlotValue: string;
  selectedSlotsValue: string[];
  t: TFunction<"forms"[]>;
  serviceConfig: Service["viewConfig"]["days" | "list" | "calendar"];
}) => string;

export const getSubmitButtonText: GetSubmitButtonText = ({
  selectedSlotValue,
  selectedSlotsValue,
  t,
  serviceConfig,
}) => {
  const textBase = t("book-free-button");
  const isMultiSelect = serviceConfig.multiSelect;

  if (selectedSlotValue === "" && !selectedSlotsValue.length) return textBase;
  if (selectedSlotValue !== "" && selectedSlotsValue.length) {
    if (isMultiSelect) return `${textBase} (${selectedSlotsValue.length})`;
    return `${textBase}: ${selectedSlotValue}`;
  }

  return `${textBase}: ${selectedSlotValue}`;
};
