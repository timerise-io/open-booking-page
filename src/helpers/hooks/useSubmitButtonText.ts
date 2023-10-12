import { useMemo } from "react";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { hoursSystemAtom, timeZoneAtom } from "state/atoms";
import { selectedSlots } from "state/atoms/selectedSlots";
import { serviceAtom } from "state/atoms/service";
import { slotsAtom } from "state/atoms/slots";
import { useLocale } from "./useLocale";

export const useSubmitButtonText = () => {
  const { t } = useTranslation(["forms"]);
  const locale = useLocale();
  const service = useRecoilValue(serviceAtom)!;
  const selectedSlotsValue = useRecoilValue(selectedSlots);
  const slots = useRecoilValue(slotsAtom)!;
  const timeZone = useRecoilValue(timeZoneAtom);
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);

  const selectedSlot = slots.find((slot) => slot.slotId === selectedSlotsValue[0])!;

  const formattedDate =
    selectedSlot?.dateTimeFrom &&
    getDatesValue({
      service,
      dateTimeFrom: selectedSlot.dateTimeFrom,
      dateTimeTo: selectedSlot.dateTimeTo,
      targetTimeZone: timeZone,
      sourceTimeZone: service.project.localTimeZone,
      locale,
      is12HoursSystem,
    });

  const textBase = t("book-free-button");

  if (!selectedSlotsValue.length) return textBase;
  if (selectedSlotsValue.length === 1) return `${textBase}: ${formattedDate}`;

  return `${textBase} (${selectedSlotsValue.length})`;
};
