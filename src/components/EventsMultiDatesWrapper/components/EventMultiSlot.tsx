import React, { useCallback, useMemo } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { TimeSlotButtonType } from "models/theme";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import styled, { css } from "styled-components";

interface EventSlotButtonProps {
  state: TimeSlotButtonType;
}

const EventSlotButton = styled.button<EventSlotButtonProps>`
  all: unset;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
  ${({ theme, state }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton[state] as any;

    return css`
      color: ${colorSchema.text};
      cursor: normal;
      border: 1px solid ${colorSchema.border};
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${colorSchema.background};
    `;
  }}

  &:hover {
    ${({ theme, state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[state] as any;
      return css`
        background-color: ${colorSchema.backgroundHover};
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
  targetTimeZone: string;
  sourceTimeZone: string;
  locale: Locale;
  service: Service;
  slots: Slot[];
}

export const EventMultiSlot: React.FC<Props> = ({ targetTimeZone, sourceTimeZone, locale, service, slots }) => {
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);
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

  const showQuantity = useMemo(() => service?.viewConfig?.multiList?.quantity, [service]);

  return (
    <Column mt={0.5} mb={0.5} w="100%">
      <EventSlotButton state={"selected"}>
        {slots.map((slot: Slot) => (
          <Typography
            typographyType="body"
            weight="500"
            as="span"
            className={slot.quantity > 0 ? "" : "unavailable-time-slot"}
            style={{ color: "inherit" }}
          >
            {getDatesRow(slot.dateTimeFrom, slot.dateTimeTo)}
          </Typography>
        ))}

        {showQuantity && (
          <Typography
            typographyType="body"
            weight="500"
            as="span"
            className={slots[0].quantity > 0 ? "" : "unavailable-time-slot"}
            style={{ color: "inherit", marginTop: "8px" }}
          >
            {t("quantity-slots-available", { quantity: slots[0].quantity })}
          </Typography>
        )}
      </EventSlotButton>
    </Column>
  );
};
