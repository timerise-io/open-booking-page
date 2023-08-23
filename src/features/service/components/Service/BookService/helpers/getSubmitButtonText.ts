import { TFunction } from "react-i18next";

type GetSubmitButtonText = ({
  selectedSlotValue,
  selectedSlotsValue,
  t,
}: {
  selectedSlotValue: string;
  selectedSlotsValue: string[];
  t: TFunction<"forms"[]>;
}) => string;

export const getSubmitButtonText: GetSubmitButtonText = ({ selectedSlotValue, selectedSlotsValue, t }) => {
  const textBase = t("book-free-button");

  if (selectedSlotValue === "" && !selectedSlotsValue.length) return textBase;
  if (selectedSlotValue === "" && selectedSlotsValue.length) return `${textBase} (${selectedSlotsValue.length})`;

  return `${textBase}: ${selectedSlotValue}`;
};
