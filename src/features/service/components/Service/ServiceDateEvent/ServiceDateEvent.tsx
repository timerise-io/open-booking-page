import React from "react";
import { Card } from "components/Card";
import { EventsWrapper } from "components/EventsWrapper";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import { useBookingStore } from "state/stores";
import styled from "styled-components";
import { HoursSystem } from "../HoursSystem";
import TimezoneInfo from "../TimezoneInfo";

const WrapperCard = styled(Card)`
  position: relative;

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const TimezoneStyledRow = styled(Row)`
  flex-wrap: wrap;
  gap: 10px;
  & > h3 {
    white-space: nowrap;
  }
`;

const TimezoneHourSystemStyledContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ServiceDateEvent = () => {
  const { t } = useTranslation(["booking"]);
  const service = useBookingStore((state) => state.service);
  const slots = useBookingStore((state) => state.serviceSlots);
  const setSelectedSlots = useBookingStore((state) => state.setSelectedSlots);
  const handlers = {
    setSelectedSlots,
  };

  return (
    <WrapperCard padding="20px">
      <Column ai="flex-start">
        <TimezoneStyledRow mb={2.5} w="100%">
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t(`date-and-time`)}
          </Typography>
          <TimezoneHourSystemStyledContainer>
            <TimezoneInfo />
            <HoursSystem />
          </TimezoneHourSystemStyledContainer>
        </TimezoneStyledRow>
        <EventsWrapper handlers={handlers} additionalData={{ service, slots }} />
      </Column>
    </WrapperCard>
  );
};
