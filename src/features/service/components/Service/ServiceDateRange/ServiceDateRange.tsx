import React from "react";
import { Card } from "components/Card";
import { DateRangeWrapper } from "components/DateRangeWrapper";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import { useBookingStore } from "state/stores";
import styled from "styled-components";
import TimeZoneSelect from "../TimeZoneSelect";

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
  const service = useBookingStore((state) => state.service)!;
  const slots = useBookingStore((state) => state.serviceSlots);
  const setSelectedDateRange = useBookingStore((state) => state.setSelectedDateRange);
  const handlers = {
    setSelectedDateRange,
  };

  return (
    <WrapperCard $padding="14px 16px">
      <Column $ai="flex-start">
        <TimezoneStyledRow $mb={1.5} $mr={1} $w="100%" $pr={2}>
          <Typography $typographyType="h3" as="h3" $displayType="contents">
            {t(`select-dates`)}
          </Typography>
          <TimeZoneSelect />
        </TimezoneStyledRow>

        <DateRangeWrapper
          id={"ServiceDateRange"}
          handlers={handlers}
          startDatePlaceholderText={t(`select-date`)}
          endDatePlaceholderText={t(`select-date`)}
          additionalData={{ service, slots }}
        />
      </Column>
    </WrapperCard>
  );
};
