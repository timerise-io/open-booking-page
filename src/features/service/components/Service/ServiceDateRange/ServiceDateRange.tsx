import { Button } from "components/Button";
import { Card } from "components/Card";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons";
import styled, { css } from "styled-components";
import TimezoneInfo from "../TimezoneInfo";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from "react-dates";
import { selectedDateRange } from "state/atoms/selectedDateRange";
import { useRecoilState } from "recoil";
// import {
//   START_DATE,
//   END_DATE,
//   HORIZONTAL_ORIENTATION,
//   ANCHOR_LEFT,
//   NAV_POSITION_TOP,
//   OPEN_DOWN,
// } from "react-dates/constants"

const WrapperCard = styled(Card)`
  position: relative;

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    margin-left: 20px;
    margin-right: 20px;
  }

  .DateRangePicker {
    width: 100%;
  }

  .DayPicker {
    width: 600px !important;

    & > div > div {
      width: 600px !important;
    }
  }

  .DayPicker_transitionContainer {
    width: 600px !important;
  }

  .CalendarMonthGrid__horizontal {
    left 0;
  }

  .CalendarMonth {
    padding: 0 16px 0 8px !important;
  }

  .DayPicker_weekHeaders {
    .DayPicker_weekHeader {
      padding: 0 !important;
      &:nth-child(2) {
        left: 302px !important;
      }
    }
  }

  .DayPicker__withBorder {
    all: unset;
  }

  .DateRangePicker_picker {
    left: -40px !important;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    ${({ theme }) => {
      return css`
        background-color: ${theme.colorSchemas.background.primary.color};
      `;
    }}
  }

  .DateRangePickerInput {
    all: unset;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;

    .DateInput {
      &:before {
        margin-bottom: calc(0.5 * ${({ theme }) => theme.spacing});
        font-size: ${({ theme }) => theme.typography.label.size};
        font-weight: ${({ theme }) => theme.typography.label.weight};
        line-height: ${({ theme }) => theme.typography.label.lineHeight};
        color: ${({ theme }) => theme.colors.dark};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        width: 0;
        min-width: 100%;
        content: "End date";
      }
      &:first-child {
        &:before {
          content: "Start date";
        }
      }
    }
  }

  .DateInput {
    all: unset;
    flex: 1;
    width: unset;
    min-width: 210px;
    display: flex;
    flex-direction: column;
  }

  .DateInput_input {
    all: unset;
    border-width: 1px;
    border-style: solid;
    width: auto;
    &::placeholder {
      color: #666;
    }
    ${({ theme }) => css`
      background-color: ${theme.colorSchemas.input.background};
      border-color: ${theme.colorSchemas.input.border};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});

      &:hover, &.DateInput_input__focused {
        border-color: ${theme.colorSchemas.input.borderHover};
      }

      &:focus {
        border-color: ${theme.colors.primary};
      }
    `}
  }

  .DateRangePickerInput_arrow {
    display: none;
  }

  .DayPickerNavigation_button {
    border: 0;
  }

  .CalendarDay {
    border 0;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
  }

  .CalendarDay__default {
    &:hover {
      border: 0;
    }
  }

  .CalendarDay__selected {
    border: 0;
    ${({ theme }) => {
      return css`
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
      `;
    }}

    &:hover, :active {
      border: 0;
      ${({ theme }) => {
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
      }}
    }
  }

  .CalendarDay__selected_span {
    border: 0;
    ${({ theme }) => {
      return css`
        background: ${theme.colorSchemas.timeSlotButton.selected.background};
        color: ${theme.colors.primary};
      `;
    }}

    &:hover, :active {
      border: 0;
      ${({ theme }) => {
        return css`
          background: ${theme.colorSchemas.timeSlotButton.selected.backgroundActive};
          color: ${theme.colors.primary};
        `;
      }}
    }
  }

  .CalendarDay__selected_start {
    border-radius: 4px 0px 0px 4px;
  }

  .CalendarDay__selected_end {
    border-radius: 0px 4px 4px 0px;
  }

  .CalendarDay__hovered_span {
    border: 0;
    ${({ theme }) => {
      return css`
        background: ${theme.colorSchemas.timeSlotButton.selected.background};
        color: ${theme.colors.primary};
      `;
    }}

    &:hover {
      border: 0;
      ${({ theme }) => {
        return css`
          background: ${theme.colorSchemas.timeSlotButton.selected.backgroundActive};
          color: ${theme.colors.primary};
        `;
      }}
    }
  }

  .CalendarMonth {
    //padding: 0 !important;
  }

  .CalendarMonth_caption {
    font-weight: 700;
    font-size: 13px;
    line-height: 20px;
    padding-top: 16px;
    padding-bottom: 32px;
    ${({ theme }) => {
      return css`
        color: ${theme.colors.primary};
      `;
    }}
  }

  .CalendarMonth_table {
    margin: 13px 0 0;
  }

  .DayPicker_weekHeader {
    top: 50px;
    //padding: 0 !important;
  }

  .DayPicker_weekHeader_ul {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    ${({ theme }) => {
      return css`
        color: ${theme.colors.darkGrey};
      `;
    }}

    small {
      font-size: 13px;
    }
  }
`;

const StyledPrevIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNextIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCalendarFooter = styled(Column)`
  flex-direction: row;
  justify-content: end;
  gap: 8px;
  margin: 12px 0 0;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.secondary.color};
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

export const ServiceDateRange = () => {
  const { t } = useTranslation();

  const [dateTimeFrom, setDateTimeFrom] = useState<any | null>(null);
  const [dateTimeTo, setDateTimeTo] = useState<any | null>(null);
  const [focusedInput, setFocusedInput] = useState<any | null>(null);

  const [, setSelectedDateRange] = useRecoilState(selectedDateRange);

  const handleChangeDate = ({ dateTimeFrom, dateTimeTo }: { dateTimeFrom: any, dateTimeTo: any }) => {
    dateTimeFrom && setDateTimeFrom(dateTimeFrom);
    dateTimeTo && setDateTimeTo(dateTimeTo);

    setSelectedDateRange({
      dateTimeFrom: dateTimeFrom ? dateTimeFrom.toISOString() : null,
      dateTimeTo: dateTimeTo ? dateTimeTo.toISOString() : null,
    })
  }

  const handleFocusedInput = (focusedInput: any) => {
     setFocusedInput(focusedInput)
  }

  const handleCloseCalendar = () => {
    setFocusedInput(null);
  }

  const handleDiscardCalendar = () => {
    setDateTimeFrom(null);
    setDateTimeTo(null);
    handleCloseCalendar();

    setSelectedDateRange({
      dateTimeFrom: null,
      dateTimeTo: null,
    })
  }

  // const renderDayContents = (e: any) => {
  //   console.log(e)
  //   return <>h1</>
  // }

  // const renderCalendarInfo: React.ReactNode = (e: any) => {
  //   console.log(e)
  //   return "<Column>test</Column>"
  // }

  // const renderCalendarInfo = ({ children }: { 
  //   children: ReactNode // ReactNode or ReactElement or JSX.Element?
  // }) => {
  //   return <div className="some-class">{children}</div>
  // }

//   // before
//   const isDayBlocked = (day) => {
//     const { unavailableDays } = this.props;
//     return unavailableDays.some((unavailableDay) => moment(unavailableDay).isSame(day));
//   }

// // after
//   isDayBlocked(day) {
//     const { unavailableDays } = this.props;
//     return unavailableDays.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
//   }

  const PrevIcon = () => (
    <StyledPrevIcon>
      <IconArrowNarrowLeft/>
    </StyledPrevIcon>
  );

  const NextIcon = () => (
    <StyledNextIcon>
      <IconArrowNarrowRight/>
    </StyledNextIcon>
  );

  return (
    <WrapperCard padding="20px">
      <Column ai="flex-start">
        <TimezoneStyledRow mb={2.5} mr={1} w="100%" pr={2}>
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t(`Select dates`)}
          </Typography>
          <TimezoneInfo />
        </TimezoneStyledRow>

        <DateRangePicker
          startDate={dateTimeFrom} // momentPropTypes.momentObj or null,
          startDateId="startDateId" // PropTypes.string.isRequired,
          endDate={dateTimeTo} // momentPropTypes.momentObj or null,
          endDateId="endDateId" // PropTypes.string.isRequired,
          onDatesChange={({startDate, endDate}) => handleChangeDate({ dateTimeFrom: startDate, dateTimeTo: endDate })} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          keepOpenOnDateSelect
          onFocusChange={handleFocusedInput} // PropTypes.func.isRequired,
          numberOfMonths={2}
          startDatePlaceholderText={"Select date"}
          endDatePlaceholderText={"Select date"}
          hideKeyboardShortcutsPanel={true}
          monthFormat={"MMMM YYYY"}
          displayFormat={"dddd D MMMM YYYY"}
          firstDayOfWeek={1}
          weekDayFormat={"dd"}
          noBorder
          verticalSpacing={6}
          navPrev={<PrevIcon/>}
          navNext={<NextIcon/>}
          daySize={40}
          transitionDuration={0}
          regular={true}
          //renderDayContents={renderDayContents}
          renderCalendarInfo={() => (
            <StyledCalendarFooter ai="stretch" w="100%" p={2.5}>
                <Button
                  type="submit"
                  buttonType="secondary"
                  data-cy="111"
                  onClick={handleDiscardCalendar}
                  style={{width: "auto", background: "#fff", boxShadow: "none"}}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  buttonType="primary"
                  data-cy="222"
                  disabled={!dateTimeFrom || !dateTimeTo}
                  onClick={handleCloseCalendar}
                  style={{width: "auto", boxShadow: "none"}}
                >
                  Done
                </Button>
            </StyledCalendarFooter>
          )}
        />
      </Column>
      
    </WrapperCard>
  );
};
