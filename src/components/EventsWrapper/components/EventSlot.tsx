import React, { useMemo } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { getDatesValue } from "helpers/functions";
import { Service } from "models/service";
import { TimeSlotButtonType } from "models/theme";
import { useRecoilValue } from "recoil";
import { selectedSlots } from "state/atoms/selectedSlots";
import styled, { css } from "styled-components";

interface EventSlotButtonProps {
  state: TimeSlotButtonType;
}

const EventSlotButton = styled.button<EventSlotButtonProps>`
  all: unset;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  ${({ theme, state }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton[state] as any;

    return css`
      color: ${colorSchema.text};
      cursor: ${state === "unavailable" ? "unset" : "pointer"};
      border-color: ${colorSchema.border};
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${colorSchema.background};
    `;
  }}

  &:hover {
    ${({ theme, state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[state] as any;
      return css`
        border-color: ${colorSchema.borderActive};
        background-color: ${colorSchema.backgroundActive};
      `;
    }}
  }

  & > .unavailable-time-slot {
    text-decoration: line-through;

    ${({ theme, state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[state] as any;
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
    setSelectedSlots: Function;
  };
  targetTimeZone: string;
  sourceTimeZone: string;
  locale: Locale;
  service: Service;
}

export const EventSlot: React.FC<Props> = ({
  id,
  dateTimeFrom,
  dateTimeTo,
  quantity,
  handlers,
  targetTimeZone,
  sourceTimeZone,
  locale,
  service,
}) => {
  const selectedSlotsValue = useRecoilValue(selectedSlots);

  const getEventSlotButtonState = (): TimeSlotButtonType => {
    if (selectedSlotsValue.includes(id)) return "selected";
    if (quantity > 0) return "available";

    return "unavailable";
  };

  const handleSlotClick = () => {
    const hasMultipleSlots = service.viewConfig?.list?.multiSelect;
    const isSlotSelected = selectedSlotsValue.includes(id);

    if (hasMultipleSlots) {
      if (isSlotSelected) {
        handlers.setSelectedSlots(selectedSlotsValue.filter((slotId: string) => slotId !== id));
      } else {
        handlers.setSelectedSlots([...selectedSlotsValue, id]);
      }
    } else {
      handlers.setSelectedSlots(isSlotSelected ? [] : [id]);
    }
  };

  const getDatesRow = useMemo(
    () =>
      getDatesValue({
        service,
        dateTimeFrom,
        dateTimeTo,
        targetTimeZone,
        sourceTimeZone,
        locale,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dateTimeFrom, dateTimeTo, targetTimeZone, sourceTimeZone, locale, service?.viewConfig?.list?.showTime],
  );

  const showQuantity = useMemo(() => service?.viewConfig?.list?.quantity, [service]);

  return (
    <Column mt={0.5} mb={0.5} w="100%">
      <EventSlotButton state={getEventSlotButtonState()} onClick={handleSlotClick} disabled={quantity === 0}>
        <Typography
          typographyType="body"
          weight="700"
          as="span"
          className={quantity > 0 ? "" : "unavailable-time-slot"}
        >
          {getDatesRow}
        </Typography>
        {showQuantity && (
          <Typography
            typographyType="body"
            weight="500"
            as="span"
            className={quantity > 0 ? "" : "unavailable-time-slot"}
          >
            {quantity} slots available
          </Typography>
        )}
      </EventSlotButton>
    </Column>
  );
};
