import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { useSlotsViewConfiguration } from "features/service/hooks/useSlotsViewConfiguration";
import { convertSourceDateTimeToTargetDateTimeWithHoursSystem } from "helpers/timeFormat";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { TimeSlotButtonType } from "models/theme";
import { useTimeSlotByDate } from "state/hooks";
import { useBookingStore, useUiStore } from "state/stores";
import styled, { css } from "styled-components";

interface TimeSlotButtonProps {
  $state: TimeSlotButtonType;
}

const TimeSlotButton = styled.button<TimeSlotButtonProps>`
  all: unset;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9px 0;

  ${({ theme, $state }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton[$state];

    return css`
      color: ${colorSchema.text};
      cursor: ${$state === "unavailable" ? "unset" : "pointer"};
      border-radius: ${theme.borderRadius};
      background-color: ${colorSchema.background} !important;
      border: 1px solid ${colorSchema.border};
      transition:
        background-color 150ms ease,
        border-color 150ms ease;
    `;
  }}

  &:hover {
    ${({ theme, $state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[$state];
      return css`
        background-color: ${colorSchema.backgroundHover} !important;
      `;
    }}
  }

  & > .unavailable-time-slot {
    text-decoration: line-through;
  }
`;

interface DummySlotProps {
  $showDuration: boolean;
  $showQuantity: boolean;
}

const dummyTimeSlotHeight: Record<string, string> = {
  "true-true": "77px",
  "false-true": "55px",
  "true-false": "64px",
  "false-false": "38px",
};

const DummySlotWrapper = styled.div<DummySlotProps>`
  width: 100%;
  border: 1px solid transparent;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, $showDuration, $showQuantity }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton.unavailable;
    return css`
      color: ${colorSchema.text};
      height: ${dummyTimeSlotHeight[`${$showDuration}-${$showQuantity}`] ?? "38px"};
    `;
  }}
`;

function DummySlot({ $showDuration, $showQuantity }: DummySlotProps) {
  return (
    <DummySlotWrapper $showDuration={$showDuration} $showQuantity={$showQuantity}>
      <Typography $typographyType="h3" $weight="500" as="span" $align="center" $color="inherit">
        -
      </Typography>
    </DummySlotWrapper>
  );
}

interface TimeSlotProps {
  dateFrom: string;
  dateTo: string;
  is12HoursSystem: boolean;
}

function getTimeSlotButtonState(selected: boolean, isAvailable: boolean): TimeSlotButtonType {
  if (selected) return "selected";
  if (isAvailable) return "available";
  return "unavailable";
}

function formatQuantity(quantity: number): string {
  if (quantity <= 0) return "-";
  if (quantity > 999) return "999+";
  return quantity.toFixed(0);
}

const QuantityText = styled(Typography)`
  font-size: 9px;
  line-height: 11px;
  margin: 2px 0 0;
`;
const DurationText = styled(Typography)`
  &.unavailable-time-slot {
    text-decoration: line-through;
  }
`;

const WrapperWithDuration = styled.div`
  display: flex;
  flex-direction: column;

  em {
    line-height: 0px;
  }
`;

interface SlotContentProps {
  slot: Slot;
  date: string;
  timeZone: string;
  is12HoursSystem: boolean;
  service: Service;
  showDuration: boolean;
  showQuantity: boolean;
}

function SlotContent({ slot, date, timeZone, is12HoursSystem, service, showDuration, showQuantity }: SlotContentProps) {
  const sourceTimeZone = service.project.localTimeZone;
  if (!sourceTimeZone) return null;

  const unavailableClassName = slot.quantity > 0 ? "" : "unavailable-time-slot";

  const formatTime = (targetDate: string) =>
    convertSourceDateTimeToTargetDateTimeWithHoursSystem({
      date: targetDate,
      targetTimeZone: timeZone,
      sourceTimeZone,
      is12HoursSystem,
    });

  if (!showDuration && !showQuantity) {
    return (
      <Typography
        $typographyType="h3"
        $weight="500"
        as="span"
        $align="center"
        className={unavailableClassName}
        color="inherit"
      >
        {formatTime(date)}
      </Typography>
    );
  }

  const timeDisplay = showDuration ? (
    <WrapperWithDuration>
      <span>{formatTime(date)}</span>
      <em>-</em>
      <span>{formatTime(slot.dateTimeTo)}</span>
    </WrapperWithDuration>
  ) : (
    formatTime(date)
  );

  return (
    <Column>
      <DurationText
        $typographyType="body"
        $weight="500"
        as="span"
        $align="center"
        className={unavailableClassName}
        color="inherit"
      >
        {timeDisplay}
      </DurationText>
      {showQuantity && (
        <QuantityText $typographyType="body" $weight="500" as="span" $align="center" $color="inherit">
          {formatQuantity(slot.quantity)}
        </QuantityText>
      )}
    </Column>
  );
}

const TimeSlot: React.FC<TimeSlotProps> = ({ dateFrom, dateTo, is12HoursSystem }) => {
  const slot = useTimeSlotByDate(dateFrom, dateTo);
  const slotId = slot?.slotId ?? "";
  const { showDuration, showQuantity } = useSlotsViewConfiguration();
  const timeZone = useUiStore((state) => state.timeZone);
  const service = useBookingStore((state) => state.service)!;
  const selectedSlotsValue = useBookingStore((state) => state.selectedSlots);
  const setSelectedSlots = useBookingStore((state) => state.setSelectedSlots);
  const selected = selectedSlotsValue.includes(slotId);

  function handleSlotClick() {
    const hasMultipleSlots = service.viewConfig?.days?.multiSelect;

    if (hasMultipleSlots) {
      if (selected) {
        setSelectedSlots(selectedSlotsValue.filter((id: string) => id !== slotId));
      } else {
        setSelectedSlots([...selectedSlotsValue, slotId]);
      }
    } else {
      setSelectedSlots(selected ? [] : [slotId]);
    }
  }

  return (
    <Column $mt={0.5} $mb={0.5} $w="100%">
      {!slot ? (
        <DummySlot $showDuration={showDuration} $showQuantity={showQuantity} />
      ) : (
        <TimeSlotButton
          $state={getTimeSlotButtonState(selected, slot.quantity > 0)}
          disabled={slot.quantity === 0}
          onClick={handleSlotClick}
        >
          <SlotContent
            slot={slot}
            date={dateFrom}
            timeZone={timeZone}
            is12HoursSystem={is12HoursSystem}
            service={service}
            showDuration={showDuration}
            showQuantity={showQuantity}
          />
        </TimeSlotButton>
      )}
    </Column>
  );
};

export default TimeSlot;
