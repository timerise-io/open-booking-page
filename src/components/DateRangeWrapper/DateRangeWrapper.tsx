import React, { useCallback, useRef, useState } from "react";
import { format, isSameDay } from "date-fns";
import { useMedia } from "helpers/hooks";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import { parse } from "iso8601-duration";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { DateRange, DayButtonProps, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { IconCalendar } from "@tabler/icons-react";
import { DateRangeFooter } from "./components";

const DATE_FORMAT = "MMM dd, y";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .rdp-root {
    --rdp-accent-color: ${({ theme }) => theme.colors.primary};
    --rdp-accent-background-color: ${({ theme }) => theme.colorSchemas.background.secondary.color};
    --rdp-range_start-color: ${({ theme }) => theme.colorSchemas.button.primary.text};
    --rdp-range_end-color: ${({ theme }) => theme.colorSchemas.button.primary.text};
    --rdp-day-width: 36px;
    --rdp-day-height: 36px;
    --rdp-day_button-width: 34px;
    --rdp-day_button-height: 34px;
    --rdp-nav_button-width: 1.5rem;
    --rdp-nav_button-height: 1.5rem;
    --rdp-nav-height: 2rem;
    --rdp-weekday-padding: 0.5rem 0;
    width: 100%;
    margin: 0;
    font-size: 0.875rem;
  }

  .rdp-month {
    background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
  }

  .rdp-months {
    width: 100%;
    max-width: none;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    gap: 1rem;
  }

  .rdp-month_caption {
    margin-bottom: 0.5rem;
  }

  .rdp-selected {
    font-size: inherit;
  }

  .DateInput_wrapper {
    position: relative;
    width: 100%;
  }

  .DateInput_icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${({ theme }) => theme.colors.dark};
    opacity: 0.6;
  }

  .DateInput_input {
    all: unset;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    cursor: pointer;
    &::placeholder {
      color: #666;
    }
    ${({ theme }) => css`
      background-color: ${theme.colorSchemas.input.background};
      border-color: ${theme.colorSchemas.input.border};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.25 * ${theme.spacing}) calc(1.375 * ${theme.spacing}) calc(1.25 * ${theme.spacing}) 36px;

      &:hover,
      &:focus {
        border-color: ${theme.colors.primary};
      }
    `}
  }
`;

const DropdownPanel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 999;
  padding: 20px 8px 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
  border: 1px solid ${({ theme }) => theme.colorSchemas.input.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
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
  placeholder: string;
  id: string;
  handlers: {
    setSelectedDateRange: (range: { dateTimeFrom: string | null; dateTimeTo: string | null }) => void;
  };
  additionalData: {
    service: Service;
    slots: Slot[];
  };
}

export const DateRangeWrapper: React.FC<Props> = ({
  numberOfMonths = 2,
  placeholder,
  handlers,
  additionalData,
}) => {
  const { t } = useTranslation(["booking"]);
  const isMobile = useMedia("(max-width: 1200px)");
  const [range, setRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(
    wrapperRef,
    useCallback(() => setIsOpen(false), []),
  );

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

  const DayContent = ({ day, modifiers: _modifiers, ...buttonProps }: DayButtonProps) => {
    const slot = additionalData.slots.find((s) => isSameDay(new Date(s.dateTimeFrom), day.date));

    return (
      <button {...buttonProps}>
        <StyledDay>
          {format(day.date, "d")}
          {hasQuantity && <span>{`${t(`avl`)} ${slot?.quantity ?? 0}`}</span>}
        </StyledDay>
      </button>
    );
  };

  const isDayDisabled = (date: Date) => {
    const hasSlot = additionalData.slots.some((slot) => {
      const slotDate = new Date(slot.dateTimeFrom);
      const isSame = isSameDay(slotDate, date);
      const quantity = slot.quantity;
      return isSame && !!quantity;
    });
    return !hasSlot;
  };

  const displayValue = (() => {
    if (range?.from && range?.to) {
      return `${format(range.from, DATE_FORMAT)} - ${format(range.to, DATE_FORMAT)}`;
    }
    if (range?.from) {
      return `${format(range.from, DATE_FORMAT)} - `;
    }
    return "";
  })();

  return (
    <StyledWrapper ref={wrapperRef}>
      <div className="DateInput_wrapper">
        <IconCalendar size={16} className="DateInput_icon" />
        <input
          className="DateInput_input"
          placeholder={placeholder}
          value={displayValue}
          onClick={() => setIsOpen(true)}
          readOnly
        />
      </div>

      {isOpen && (
        <DropdownPanel>
          <DayPicker
            mode="range"
            navLayout="around"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : numberOfMonths}
            disabled={isDayDisabled}
            components={{
              DayButton: DayContent,
            }}
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
        </DropdownPanel>
      )}
    </StyledWrapper>
  );
};
