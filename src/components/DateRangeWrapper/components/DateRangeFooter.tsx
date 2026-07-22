import React from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Column, ColumnProps } from "components/layout/Column";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

const StyledCalendarFooter = styled(Column)<{ hasDuration: boolean } & ColumnProps>`
  flex-direction: row;
  justify-content: ${({ hasDuration }) => (hasDuration ? "space-between" : "flex-end")};
  gap: 8px;
  background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.lg)} {
    flex-direction: column;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.lg)} {
    width: 100%;
    flex-direction: column;
    margin: 16px 0 0;
  }
`;

const compactButton = css`
  width: auto;
  box-shadow: none;
  padding: 8px 16px;
  font-size: 0.875rem;
`;

const StyledDiscardButton = styled(Button)`
  ${compactButton}
  background: ${({ theme }) => theme.colorSchemas.background.primary.color};
`;

const StyledDoneButton = styled(Button)`
  ${compactButton}
`;

interface Props {
  duration?: number | null | undefined;
  handleDiscardCalendar: () => void;
  handleCloseCalendar: () => void;
  dateTimeFrom: Date | undefined;
  dateTimeTo: Date | undefined;
  rangeSelect: boolean;
}

export const DateRangeFooter: React.FC<Props> = ({
  duration,
  handleDiscardCalendar,
  handleCloseCalendar,
  dateTimeFrom,
  dateTimeTo,
  rangeSelect,
}) => {
  const { t } = useTranslation(["booking"]);

  return (
    <StyledCalendarFooter $ai="center" $w="100%" $p={1} hasDuration={Boolean(duration && rangeSelect)}>
      <Typography $typographyType="body" $displayType="contents">
        {duration && rangeSelect && t("select-date-range-up-to", { duration })}
      </Typography>
      <StyledButtons>
        <StyledDiscardButton type="submit" $buttonType="secondary" data-cy="111" onClick={handleDiscardCalendar}>
          {t(`discard`)}
        </StyledDiscardButton>
        <StyledDoneButton
          type="submit"
          $buttonType="primary"
          data-cy="222"
          disabled={!dateTimeFrom || !dateTimeTo}
          onClick={handleCloseCalendar}
        >
          {t(`done`)}
        </StyledDoneButton>
      </StyledButtons>
    </StyledCalendarFooter>
  );
};
