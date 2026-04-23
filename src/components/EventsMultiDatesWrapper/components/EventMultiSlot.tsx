import { useCallback } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Locale } from "date-fns";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions/getDatesValue";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { TimeSlotButtonType } from "models/theme";
import { useTranslation } from "react-i18next";
import { useUiStore } from "state/stores";
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
      cursor: normal;
      border: 1px solid ${colorSchema.border};
      border-radius: ${theme.borderRadius};
      background-color: ${colorSchema.background};
      transition:
        background-color 150ms ease,
        border-color 150ms ease;
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
  targetTimeZone: string;
  sourceTimeZone: string;
  locale: Locale;
  service: Service;
  slots: Slot[];
}

export function EventMultiSlot({ targetTimeZone, sourceTimeZone, locale, service, slots }: Props) {
  const hoursSystem = useUiStore((state) => state.hoursSystem);
  const is12HoursSystem = hoursSystem === HOURS_SYSTEMS.h12;
  const { t } = useTranslation();

  const getDatesRow = useCallback(
    (dateTimeFrom: string, dateTimeTo: string) =>
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
    [targetTimeZone, sourceTimeZone, locale, service?.viewConfig?.list?.showTime, is12HoursSystem],
  );

  const showQuantity = service?.viewConfig?.multiList?.quantity;
  const sortedSlots = [...slots].sort((a, b) => a.dateTimeFrom.localeCompare(b.dateTimeFrom));
  const firstSlot = sortedSlots[0];

  return (
    <Column $mt={0.5} $mb={0.5} $w="100%">
      <EventSlotButton $state="selected">
        {sortedSlots.map((slot: Slot) => (
          <Typography
            key={`${slot.dateTimeFrom}-${slot.dateTimeTo}`}
            $typographyType="body"
            $weight="500"
            as="span"
            className={slot.quantity > 0 ? "" : "unavailable-time-slot"}
            style={{ color: "inherit" }}
          >
            {getDatesRow(slot.dateTimeFrom, slot.dateTimeTo)}
          </Typography>
        ))}

        {showQuantity && firstSlot && (
          <Typography
            $typographyType="body"
            $weight="500"
            as="span"
            className={firstSlot.quantity > 0 ? "" : "unavailable-time-slot"}
            style={{ color: "inherit", marginTop: "8px" }}
          >
            {t("quantity-slots-available", { quantity: firstSlot.quantity })}
          </Typography>
        )}
      </EventSlotButton>
    </Column>
  );
}
