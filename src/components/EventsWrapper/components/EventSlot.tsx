import { useMemo } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Locale } from "date-fns";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions/getDatesValue";
import { Service } from "models/service";
import { TimeSlotButtonType } from "models/theme";
import { useTranslation } from "react-i18next";
import { useBookingStore, useUiStore } from "state/stores";
import styled, { css } from "styled-components";

interface EventSlotButtonProps {
  $state: TimeSlotButtonType;
}

const EventSlotButton = styled.button<EventSlotButtonProps>`
  all: unset;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
  ${({ theme, $state }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton[$state];

    return css`
      color: ${colorSchema.text};
      cursor: ${$state === "unavailable" ? "unset" : "pointer"};
      border: 1px solid ${colorSchema.border};
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${colorSchema.background};
    `;
  }}

  &:hover {
    ${({ theme, $state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[$state];
      return css`
        background-color: ${colorSchema.backgroundHover};
      `;
    }}
  }

  & > .unavailable-time-slot {
    text-decoration: line-through;

    ${({ theme, $state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[$state];
      return css`
        color: ${colorSchema.text};
      `;
    }}
  }
`;

interface Props {
  id: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  quantity: number;
  handlers: {
    setSelectedSlots: (slotIds: string[]) => void;
  };
  targetTimeZone: string;
  sourceTimeZone: string;
  locale: Locale;
  service: Service;
}

export function EventSlot({ id, dateTimeFrom, dateTimeTo, quantity, handlers, targetTimeZone, sourceTimeZone, locale, service }: Props) {
  const selectedSlotsValue = useBookingStore((state) => state.selectedSlots);
  const hoursSystem = useUiStore((state) => state.hoursSystem);
  const is12HoursSystem = hoursSystem === HOURS_SYSTEMS.h12;
  const { t } = useTranslation();

  const isSelected = selectedSlotsValue.includes(id);
  const isAvailable = quantity > 0;

  function getEventSlotButtonState(): TimeSlotButtonType {
    if (isSelected) return "selected";
    if (isAvailable) return "available";
    return "unavailable";
  }

  function handleSlotClick() {
    const hasMultipleSlots = service.viewConfig?.list?.multiSelect;

    if (hasMultipleSlots) {
      if (isSelected) {
        handlers.setSelectedSlots(selectedSlotsValue.filter((slotId: string) => slotId !== id));
      } else {
        handlers.setSelectedSlots([...selectedSlotsValue, id]);
      }
    } else {
      handlers.setSelectedSlots(isSelected ? [] : [id]);
    }
  }

  const datesRow = useMemo(
    () =>
      getDatesValue({
        service,
        dateTimeFrom,
        dateTimeTo,
        targetTimeZone,
        sourceTimeZone,
        locale,
        is12HoursSystem,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dateTimeFrom,
      dateTimeTo,
      targetTimeZone,
      sourceTimeZone,
      locale,
      service?.viewConfig?.list?.showTime,
      is12HoursSystem,
    ],
  );

  const showQuantity = service?.viewConfig?.list?.quantity;
  const unavailableClassName = isAvailable ? "" : "unavailable-time-slot";

  return (
    <Column $mt={0.5} $mb={0.5} $w="100%">
      <EventSlotButton $state={getEventSlotButtonState()} onClick={handleSlotClick} disabled={!isAvailable}>
        <Typography
          $typographyType="body"
          $weight="700"
          as="span"
          className={unavailableClassName}
          style={{ color: "inherit" }}
        >
          {datesRow}
        </Typography>
        {showQuantity && (
          <Typography
            $typographyType="body"
            $weight="500"
            as="span"
            className={unavailableClassName}
            style={{ color: "inherit" }}
          >
            {t("quantity-slots-available", { quantity })}
          </Typography>
        )}
      </EventSlotButton>
    </Column>
  );
}
