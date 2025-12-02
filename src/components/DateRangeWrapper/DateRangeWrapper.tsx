import React, { useEffect, useState } from "react";
import { useMedia } from "helpers/hooks";
import { parse } from "iso8601-duration";
import { addDays, format, isAfter, isBefore, isSameDay, parseISO } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { DateRangeFooter } from "./components";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: ${({ theme }) => theme.colors.primary};
    --rdp-background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
    margin: 0;
  }

  .rdp-month {
    background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
  }

  .rdp-day_selected {
    background-color: var(--rdp-accent-color);
    color: white;
  }

  .rdp-day_today {
    font-weight: bold;
  }

  .DateInput {
    all: unset;
    flex: 1;
    width: unset;
    min-width: 210px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
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
      &:focus {
        border-color: ${theme.colors.primary};
      }
    `}
  }

  .DateRangePickerInput {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
    margin-bottom: 20px;
  }
`;

const StyledDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

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
  id,
  handlers,
  additionalData,
}) => {
  const { t, i18n } = useTranslation(["booking"]);
  const isMobile = useMedia("(max-width: 1200px)");
  const [range, setRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const duration = additionalData.service.viewConfig.calendar.maxRange
    ? parse(additionalData.service.viewConfig.calendar.maxRange).days
    : null;
  const hasQuantity = additionalData.service.viewConfig.calendar.quantity;
  const rangeSelect = additionalData.service.viewConfig.calendar.rangeSelect;

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    handlers.setSelectedDateRange({
      dateTimeFrom: newRange?.from ? newRange.from.toISOString() : null,
      dateTimeTo: newRange?.to ? newRange.to.toISOString() : null,
    });
  };

  const handleDiscardCalendar = () => {
    setRange(undefined);
    setIsOpen(false);
    handlers.setSelectedDateRange({ dateTimeFrom: null, dateTimeTo: null });
  };

  const handleCloseCalendar = () => {
    setIsOpen(false);
  };

  const DayContent = (props: any) => {
    const { date } = props;
    let quantity;
    additionalData.slots.some((slot: { quantity: any; dateTimeFrom: string }) => {
      const slotDate = new Date(slot.dateTimeFrom);
      const isSame = isSameDay(slotDate, date);
      if (isSame) quantity = slot.quantity;
      return isSame;
    });

    return (
      <StyledDay>
        {format(date, "d")}
        {hasQuantity && <span>{`${t(`avl`)} ${quantity ?? 0}`}</span>}
      </StyledDay>
    );
  };

  const isDayDisabled = (date: Date) => {
    let isSame, quantity;
    const hasSlot = additionalData.slots.some((slot: { quantity: any; dateTimeFrom: string }) => {
      const slotDate = new Date(slot.dateTimeFrom);
      isSame = isSameDay(slotDate, date);
      quantity = slot.quantity;
      return isSame && !!quantity;
    });
    return !hasSlot;
  };

  return (
    <StyledWrapper>
      <div className="DateRangePickerInput">
        <div className="DateInput" onClick={() => setIsOpen(true)}>
          <label>{t("start-date")}</label>
          <input
            className="DateInput_input"
            placeholder={startDatePlaceholderText}
            value={range?.from ? format(range.from, "dd-MM-yyyy") : ""}
            readOnly
          />
        </div>
        <div className="DateInput" onClick={() => setIsOpen(true)}>
          <label>{t("end-date")}</label>
          <input
            className="DateInput_input"
            placeholder={endDatePlaceholderText}
            value={range?.to ? format(range.to, "dd-MM-yyyy") : ""}
            readOnly
          />
        </div>
      </div>

      {isOpen && (
        <div>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : numberOfMonths}
            disabled={isDayDisabled}
            components={
              {
                DayContent: DayContent,
              } as any
            }
            footer={
              <DateRangeFooter
                duration={duration}
                handleDiscardCalendar={handleDiscardCalendar}
                handleCloseCalendar={handleCloseCalendar}
                dateTimeFrom={range?.from}
                dateTimeTo={range?.to}
                rangeSelect={rangeSelect}
              />
            }
          />
        </div>
      )}
    </StyledWrapper>
  );
};
