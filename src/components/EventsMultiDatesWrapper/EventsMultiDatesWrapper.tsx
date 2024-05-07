import React, { useEffect } from "react";
import InfoBox from "components/InfoBox";
import { useLocale } from "helpers/hooks/useLocale";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";
import { EventMultiSlot } from "./components";

const StyledInfoBox = styled.div`
  display: flex;
  align-self: center;
`;

interface Props {
  handlers: {
    setSelectedSlots: Function;
  };
  additionalData: {
    service: Service;
    slots: Slot[];
  };
}

export const EventsMultiDatesWrapper: React.FC<Props> = ({ handlers, additionalData }) => {
  const { t } = useTranslation();
  const timeZone = useRecoilValue(timeZoneAtom);
  const service = useRecoilValue(serviceAtom)!;
  const locale = useLocale();

  useEffect(() => {
    handlers.setSelectedSlots(additionalData.slots.map((slot: Slot) => slot.slotId));
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
    <EventMultiSlot
      targetTimeZone={timeZone}
      sourceTimeZone={service.project.localTimeZone}
      locale={locale}
      service={additionalData.service}
      slots={additionalData.slots}
    />
  );
};
