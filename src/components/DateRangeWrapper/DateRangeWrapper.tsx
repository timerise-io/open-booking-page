import React, { useEffect, useState } from "react";
import { useMedia } from "helpers/hooks";
import { parse } from "iso8601-duration";
import moment from "moment";
import "moment/locale/cs";
import "moment/locale/de";
import "moment/locale/el";
import "moment/locale/en-gb";
import "moment/locale/es";
import "moment/locale/fi";
import "moment/locale/fr";
import "moment/locale/hu";
import "moment/locale/it";
import "moment/locale/nl";
import "moment/locale/pl";
import "moment/locale/pt";
import "moment/locale/sk";
import "moment/locale/sv";
import "moment/locale/tr";
import "moment/locale/uk";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons";
import { DateRangeFooter } from "./components";

const StyledWrapper = styled.div<{ translations: any }>`
  position: relative;
  width: 100%;

  .DateRangePicker {
    width: 100%;
  }

  .DayPicker {
    width: 600px !important;

    ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
      width: 100% !important;
    }

    & > div > div {
      width: 600px !important;

      ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
        width: 100% !important;
      }
    }
  }

  .DayPicker_transitionContainer {
    width: 600px !important;

    ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
      width: 100% !important;
    }
  }

  .CalendarMonthGrid__horizontal {
    left 0;
  }

  .CalendarMonthGrid__vertical {

  }

  .CalendarMonth {
    padding: 0 16px 0 8px !important;

    ${({ theme }) => {
      return css`
        background: ${theme.colorSchemas.background.primary.color};
      `;
    }}
  }

  .CalendarMonthGrid {
    ${({ theme }) => {
      return css`
        background: ${theme.colorSchemas.background.primary.color};
      `;
    }}
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
    left: 0px !important;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    ${({ theme }) => {
      return css`
        background-color: ${theme.colorSchemas.background.primary.color};
      `;
    }}

    ${({ theme }) => theme.mediaBelow(theme.breakpoints.lg)} {
      left: 0 !important;
    }

    ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
      top: 115px !important;
    }
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
        content: "${(props) => props.translations(`end-date`)}";
      }
      &:first-child {
        &:before {
          content: "${(props) => props.translations(`start-date`)}";
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

      &:hover,
      &.DateInput_input__focused {
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
    ${({ theme }) => {
      return css`
        background: ${theme.colorSchemas.background.primary.color};
        color: ${theme.colors.primary};
      `;
    }}

    &:hover {
      border: 0;

      ${({ theme }) => {
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
      }}
    }
  }

  .CalendarDay__selected {
    border: 0;
    ${({ theme }) => {
      return css`
        background: ${theme.colors.primary} !important;
        color: ${theme.colors.white} !important;
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

const StyledDay = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
  }
`;

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
  const { t, i18n } = useTranslation(["booking"]);
  const isMobile = useMedia("(max-width: 1200px)");
  const [dateTimeFrom, setDateTimeFrom] = useState<any | null>(null);
  const [dateTimeTo, setDateTimeTo] = useState<any | null>(null);
  const [focusedInput, setFocusedInput] = useState<any | null>(null);
  const duration = additionalData.service.viewConfig.calendar.maxRange
    ? parse(additionalData.service.viewConfig.calendar.maxRange).days
    : null;
  const hasQuantity = additionalData.service.viewConfig.calendar.quantity;
  const rangeSelect = additionalData.service.viewConfig.calendar.rangeSelect;

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  const handleChangeDate = ({ dateTimeFrom, dateTimeTo }: { dateTimeFrom: any; dateTimeTo: any }) => {
    dateTimeFrom && setDateTimeFrom(dateTimeFrom);
    dateTimeTo && setDateTimeTo(dateTimeTo);

    handlers.setSelectedDateRange({
      dateTimeFrom: dateTimeFrom ? dateTimeFrom.toISOString() : null,
      dateTimeTo: dateTimeTo ? dateTimeTo.toISOString() : null,
    });
  };

  const handleFocusedInput = (focusedInput: any) => {
    setFocusedInput(focusedInput);
  };

  const handleCloseCalendar = () => {
    setFocusedInput(null);
  };

  const handleDiscardCalendar = () => {
    setDateTimeFrom(null);
    setDateTimeTo(null);
    handleCloseCalendar();
  };

  const renderDayContents = (day: any) => {
    let quantity;
    additionalData.slots.some((slot: { quantity: any; dateTimeFrom: moment.MomentInput }) => {
      const isSameDay = moment(slot.dateTimeFrom).format("DD-MM-YYYY") === day.format("DD-MM-YYYY");
      if (isSameDay) quantity = slot.quantity;
      return isSameDay;
    });

    return (
      <StyledDay>
        {day.format("D")}
        {hasQuantity && <span>{`${t(`avl`)} ${quantity ?? 0}`}</span>}
      </StyledDay>
    );
  };

  const isDayBlocked = (day: any) => {
    let isSameDay, quantity;

    const hasSlot = additionalData.slots.some((slot: { quantity: any; dateTimeFrom: moment.MomentInput }) => {
      isSameDay = moment(slot.dateTimeFrom).format("DD-MM-YYYY") === day.format("DD-MM-YYYY");
      quantity = slot.quantity;
      return isSameDay && !!quantity;
    });

    return !hasSlot;
  };

  const isOutsideRange = (day: { isBefore: (arg0: any) => any; isAfter: (arg0: any) => any }) =>
    dateTimeFrom &&
    duration &&
    rangeSelect &&
    focusedInput === "endDate" &&
    (day.isBefore(dateTimeFrom) || day.isAfter(dateTimeFrom.clone().add(duration - 1, "days")));

  const PrevIcon = () => (
    <StyledPrevIcon>
      <IconArrowNarrowLeft />
    </StyledPrevIcon>
  );

  const NextIcon = () => (
    <StyledNextIcon>
      <IconArrowNarrowRight />
    </StyledNextIcon>
  );

  return (
    <StyledWrapper translations={t}>
      <DateRangePicker
        startDate={dateTimeFrom}
        startDateId={`startDate-${id}`}
        endDate={dateTimeTo}
        endDateId={`endDate-${id}`}
        onDatesChange={({ startDate, endDate }) => handleChangeDate({ dateTimeFrom: startDate, dateTimeTo: endDate })}
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
        navPrev={<PrevIcon />}
        navNext={<NextIcon />}
        daySize={daySize}
        transitionDuration={transitionDuration}
        regular={regular}
        isOutsideRange={isOutsideRange}
        orientation={isMobile ? "vertical" : "horizontal"}
        //withFullScreenPortal

        renderDayContents={renderDayContents}
        isDayBlocked={isDayBlocked}
        renderCalendarInfo={() => (
          <DateRangeFooter
            duration={duration}
            handleDiscardCalendar={handleDiscardCalendar}
            handleCloseCalendar={handleCloseCalendar}
            dateTimeFrom={dateTimeFrom}
            dateTimeTo={dateTimeTo}
            rangeSelect={rangeSelect}
          />
        )}
      />
    </StyledWrapper>
  );
};
