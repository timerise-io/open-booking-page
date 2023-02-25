import { Button } from "components/Button";
import { Column } from "components/layout/Column";
import React, { useState } from "react";
//import { useTranslation } from "react-i18next";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons";
import styled, { css } from "styled-components";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from "react-dates";
import { Typography } from "components/Typography";
import { parse } from "iso8601-duration";
import moment from "moment";

const Wrapper = styled.div`
  position: relative;
  width: 100%;

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

  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_calendar {
    background: none;
    ${({ theme }) => {
      return css`
        color: ${theme.colors.darkGrey};
      `;
    }}

    &:hover, &:active {
      background: none;
      ${({ theme }) => {
        return css`
          color: ${theme.colors.darkGrey};
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
  justify-content: space-between;
  gap: 8px;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.secondary.color};
    `;
  }}
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
`;

const StyledDay = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
  }
`

interface Props {
  numberOfMonths?: number;
  startDatePlaceholderText: string;
  endDatePlaceholderText: string;
  hideKeyboardShortcutsPanel?: boolean;
  monthFormat?: string;
  displayFormat?: string;
  weekDayFormat?: string;
  verticalSpacing?: number;
  daySize?: number;
  transitionDuration?: number;
  regular?: boolean;
  id: string;
  handlers: {
    setSelectedDateRange: Function;
  };
  additionalData: any;
}


export const DateRangeWrapper: React.FC<Props> = ({
  numberOfMonths = 2,
  startDatePlaceholderText,
  endDatePlaceholderText,
  hideKeyboardShortcutsPanel = true,
  monthFormat = "MMMM YYYY",
  displayFormat = "dddd D MMMM YYYY",
  weekDayFormat = "dd",
  verticalSpacing = 6,
  daySize = 40,
  transitionDuration = 0,
  regular = true,
  id,
  handlers,
  additionalData,
}) => {
  //const { t } = useTranslation();

  const [dateTimeFrom, setDateTimeFrom] = useState<any | null>(null);
  const [dateTimeTo, setDateTimeTo] = useState<any | null>(null);
  const [focusedInput, setFocusedInput] = useState<any | null>(null);
  const duration = additionalData.service.viewConfig.range.maxRange ? parse(additionalData.service.viewConfig.range.maxRange).days : null;
console.log(additionalData?.slots)
  const handleChangeDate = ({ dateTimeFrom, dateTimeTo }: { dateTimeFrom: any, dateTimeTo: any }) => {
    dateTimeFrom && setDateTimeFrom(dateTimeFrom);
    dateTimeTo && setDateTimeTo(dateTimeTo);

    handlers.setSelectedDateRange({
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
  }

  const renderDayContents = (day: any) => {
    let quantity;
    additionalData.slots.some((slot: {
      quantity: any; dateTimeFrom: moment.MomentInput; 
    }) => {
      const isSameDay = moment(slot.dateTimeFrom).format("DD-MM-YYYY") === day.format("DD-MM-YYYY");
      if (isSameDay) quantity = slot.quantity;
      return isSameDay;
    });

    return <StyledDay>{ day.format("D") }<span>{ `avl. ${quantity ?? 0}` }</span></StyledDay>
  }

  const isDayBlocked = (day: any) => {
    let isSameDay, quantity;

    const hasSlot = additionalData.slots.some((slot: {
      quantity: any; dateTimeFrom: moment.MomentInput; 
    }) => {
      isSameDay = moment(slot.dateTimeFrom).format("DD-MM-YYYY") === day.format("DD-MM-YYYY");
      quantity = slot.quantity;
      return isSameDay && !!quantity;
    });

    return !hasSlot;
  }

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
    <Wrapper>
      <DateRangePicker
          startDate={dateTimeFrom}
          startDateId={`startDate-${id}`}
          endDate={dateTimeTo}
          endDateId={`endDate-${id}`}
          onDatesChange={({startDate, endDate}) => handleChangeDate({ dateTimeFrom: startDate, dateTimeTo: endDate })}
          focusedInput={focusedInput}
          keepOpenOnDateSelect
          onFocusChange={handleFocusedInput}
          numberOfMonths={numberOfMonths}
          startDatePlaceholderText={startDatePlaceholderText}
          endDatePlaceholderText={endDatePlaceholderText}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          monthFormat={monthFormat}
          displayFormat={displayFormat}
          firstDayOfWeek={1}
          weekDayFormat={weekDayFormat}
          noBorder
          verticalSpacing={verticalSpacing}
          navPrev={<PrevIcon/>}
          navNext={<NextIcon/>}
          daySize={daySize}
          transitionDuration={transitionDuration}
          regular={regular}
          
          renderDayContents={renderDayContents}
          isDayBlocked={isDayBlocked}
          renderCalendarInfo={() => (
            <StyledCalendarFooter ai="center" w="100%" p={2.5}>
              <Typography typographyType="body" displayType="contents">
                { duration && `Select date range up to ${duration} days` }
              </Typography>
              <StyledButtons>
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
              </StyledButtons>
            </StyledCalendarFooter>
          )}
        />
    </Wrapper>
  );
};
