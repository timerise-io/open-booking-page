import { Card } from "components/Card";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import TimezoneInfo from "../TimezoneInfo";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { selectedDateRange } from "state/atoms/selectedDateRange";
import { serviceAtom } from "state/atoms/service";
import { serviceSlotsAtom } from "state/atoms/serviceSlots";
import { useRecoilState, useRecoilValue } from "recoil";
import { DateRangeWrapper } from "components/DateRangeWrapper";

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

export const ServiceDateRange = () => {
  const { t } = useTranslation(["booking"]);
  const service = useRecoilValue(serviceAtom);
  const slots = useRecoilValue(serviceSlotsAtom);
  const [, setSelectedDateRange] = useRecoilState(selectedDateRange);
  const handlers = {
    setSelectedDateRange,
  }

  return (
    <WrapperCard padding="20px">
      <Column ai="flex-start">
        <TimezoneStyledRow mb={2.5} mr={1} w="100%" pr={2}>
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t(`select-dates`)}
          </Typography>
          <TimezoneInfo />
        </TimezoneStyledRow>

        <DateRangeWrapper
          id={"ServiceDateRange"}
          handlers={handlers}
          startDatePlaceholderText={t(`select-date`)}
          endDatePlaceholderText={t(`select-date`)}
          additionalData={{service, slots}}
        />

      </Column>
      
    </WrapperCard>
  );
};
