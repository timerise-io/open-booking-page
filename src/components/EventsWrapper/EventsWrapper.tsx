import React, { useEffect } from "react";
import InfoBox from "components/InfoBox";
import { useLocale } from "helpers/hooks/useLocale";
import { Slot } from "models/slots";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";
import { EventSlot } from "./components";

const StyledInfoBox = styled.div`
  display: flex;
  align-self: center;
`;

interface Props {
  handlers: {
    setSelectedSlots: Function;
  };
  additionalData: any;
}

export const EventsWrapper: React.FC<Props> = ({ handlers, additionalData }) => {
  const { t } = useTranslation();
  const timeZone = useRecoilValue(timeZoneAtom);
  const service = useRecoilValue(serviceAtom)!;
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

  return (
    <>
      {additionalData.slots
        .filter((slot: Slot) => slot.quantity > 0)
        .map((slot: Slot) => (
          <EventSlot
            key={slot.slotId}
            id={slot.slotId}
            dateTimeFrom={slot.dateTimeFrom}
            dateTimeTo={slot.dateTimeTo}
            quantity={slot.quantity}
            handlers={handlers}
            targetTimeZone={timeZone}
            sourceTimeZone={service.project.localTimeZone}
            locale={locale}
            service={additionalData.service}
          />
        ))}
    </>
  );
};
