import React from "react";
import { Card } from "components/Card";
import { EventsWrapper } from "components/EventsWrapper";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSlots } from "state/atoms/selectedSlots";
import { serviceAtom } from "state/atoms/service";
import { serviceSlotsAtom } from "state/atoms/serviceSlots";
import styled from "styled-components";
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

export const ServiceDateEvent = () => {
  const { t } = useTranslation(["booking"]);
  const service = useRecoilValue(serviceAtom);
  const slots = useRecoilValue(serviceSlotsAtom);
  const [, setSelectedSlots] = useRecoilState(selectedSlots);
  const handlers = {
    setSelectedSlots,
  };

  return (
    <WrapperCard padding="20px">
      <Column ai="flex-start">
        <TimezoneStyledRow mb={2.5} mr={1} w="100%" pr={2}>
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t(`date-and-time`)}
          </Typography>
          <TimezoneInfo />
        </TimezoneStyledRow>
        <EventsWrapper handlers={handlers} additionalData={{ service, slots }} />
      </Column>
    </WrapperCard>
  );
};
