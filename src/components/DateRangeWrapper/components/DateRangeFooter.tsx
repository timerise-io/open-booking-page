import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "components/Button";
import { Column } from "components/layout/Column";
import { Typography } from "components/Typography";
import styled, { css } from "styled-components";

const StyledCalendarFooter = styled(Column)`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
    `;
  }}

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

const StyledDiscardButton = styled(Button)`
  width: auto;
  box-shadow: none;

  ${({ theme }) => {
    return css`
      background: ${theme.colorSchemas.background.primary.color};
    `;
  }}
`;

const StyledDoneButton = styled(Button)`
  width: auto;
  box-shadow: none;
`;

interface Props {
  duration?: number | null | undefined;
  handleDiscardCalendar: Function;
  handleCloseCalendar: Function;
  dateTimeFrom: any;
  dateTimeTo: any;
}

export const DateRangeFooter: React.FC<Props> = ({
  duration,
  handleDiscardCalendar,
  handleCloseCalendar,
  dateTimeFrom,
  dateTimeTo,
}) => {
  const { t } = useTranslation(["booking"]);

  return (
    <StyledCalendarFooter ai="center" w="100%" p={2.5}>
      <Typography typographyType="body" displayType="contents">
        { duration && t("select-date-range-up-to", { duration }) }
      </Typography>
      <StyledButtons>
        <StyledDiscardButton
          type="submit"
          buttonType="secondary"
          data-cy="111"
          onClick={() => handleDiscardCalendar()}
        >
          { t(`discard`) }
        </StyledDiscardButton>
        <StyledDoneButton
          type="submit"
          buttonType="primary"
          data-cy="222"
          disabled={!dateTimeFrom || !dateTimeTo}
          onClick={() => handleCloseCalendar()}
        >
          { t(`done`) }
        </StyledDoneButton>
      </StyledButtons>
    </StyledCalendarFooter>
  );
};
