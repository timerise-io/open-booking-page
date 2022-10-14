import { Card, CardProps } from "components/Card";
import { ContextButton } from "components/ContextButton";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { slotsDayPattern } from "state/selectors/slotsDayPattern";
import styled, { css } from "styled-components";
import ServiceCalendarActionRow from "../ServiceCalendarActionRow";
import TimezoneInfo from "../TimezoneInfo";
import ServiceCalendar from "./ServiceCalendar/ServiceCalendar";

const WrapperCard = styled(Card)<{ fullHeight: boolean } & CardProps>`
  overflow: hidden;
  position: relative;

  ${({ fullHeight }) => {
    if (fullHeight)
      return css`
        max-height: unset;
      `;

    return css`
      max-height: 715px;
    `;
  }}

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const ShowMoreWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  width: calc(100% - 24px);
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
      border-top: 1px solid ${theme.colorSchemas.input.border};
    `;
  }}
`;

const TimezoneStyledRow = styled(Row)`
  flex-wrap: wrap;
  gap: 10px;
  & > h3 {
    white-space: nowrap;
  }
`;

const FULL_HEIGHT_COUNT = 10;

const ServiceDateTime = () => {
  const { t } = useTranslation();
  const numberOfSlotsPerDay = useRecoilValue(slotsDayPattern).length;
  const [isFullHeight, setIsFullHeight] = useState(
    numberOfSlotsPerDay < FULL_HEIGHT_COUNT + 1
  );

  useEffect(() => {
    setIsFullHeight(numberOfSlotsPerDay < FULL_HEIGHT_COUNT + 1);
  }, [numberOfSlotsPerDay]);

  return (
    <WrapperCard padding="20px 12px" fullHeight={isFullHeight}>
      <Column ai="flex-start">
        <TimezoneStyledRow mb={2.5} ml={1} mr={1} w="100%" pr={2}>
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t(`Select date and time`)}
          </Typography>
          <TimezoneInfo />
        </TimezoneStyledRow>
        <ServiceCalendarActionRow />
        <ServiceCalendar />
      </Column>
      {numberOfSlotsPerDay > FULL_HEIGHT_COUNT && <Box mb={10}></Box>}
      {numberOfSlotsPerDay > FULL_HEIGHT_COUNT && (
        <ShowMoreWrapper>
          <ContextButton
            colorType="primary"
            onClick={() => {
              setIsFullHeight(!isFullHeight);
            }}
          >
            <Typography
              typographyType="body"
              align="center"
              as="span"
              color="inherit"
              weight="700"
            >
              {t(isFullHeight === false ? "Show more" : "Show less")}
            </Typography>
          </ContextButton>
        </ShowMoreWrapper>
      )}
    </WrapperCard>
  );
};

export default ServiceDateTime;
