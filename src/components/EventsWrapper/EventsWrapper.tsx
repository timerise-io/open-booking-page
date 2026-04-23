import React, { useEffect } from "react";
import InfoBox from "components/InfoBox";
import { useLocale } from "helpers/hooks/useLocale";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { useTranslation } from "react-i18next";
import { useUiStore } from "state/stores";
import styled from "styled-components";
import { EventSlot } from "./components";

const StyledInfoBox = styled.div`
  display: flex;
  align-self: center;
`;

interface Props {
  handlers: {
    setSelectedSlots: (slotIds: string[]) => void;
  };
  additionalData: {
    service: Service;
    slots: Slot[];
  };
}

export const EventsWrapper: React.FC<Props> = ({ handlers, additionalData }) => {
  const { t } = useTranslation();
  const timeZone = useUiStore((state) => state.timeZone);
  const locale = useLocale();

  useEffect(() => {
    if (additionalData?.slots?.length === 1) {
      handlers.setSelectedSlots([additionalData.slots[0].slotId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalData?.slots?.length]);

  if (!additionalData?.slots?.length) {
    return (
      <StyledInfoBox>
        <InfoBox>{t("no-event-slots-available")}</InfoBox>
      </StyledInfoBox>
    );
  }

  const availableSlots = additionalData.slots
    .filter((slot) => slot.quantity > 0)
    .slice()
    .sort((a, b) => a.dateTimeFrom.localeCompare(b.dateTimeFrom));

  return (
    <>
      {availableSlots.map((slot) => (
        <EventSlot
          key={slot.slotId}
          id={slot.slotId}
          dateTimeFrom={slot.dateTimeFrom}
          dateTimeTo={slot.dateTimeTo}
          quantity={slot.quantity}
          handlers={handlers}
          targetTimeZone={timeZone}
          locale={locale}
          service={additionalData.service}
        />
      ))}
    </>
  );
};
