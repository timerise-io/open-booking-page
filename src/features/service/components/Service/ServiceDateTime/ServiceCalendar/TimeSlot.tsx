import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { convertSourceDateTimeToTargetDateTimeWithHoursSystem } from "helpers/timeFormat";
import { Service } from "models/service";
import { Slot } from "models/slots";
import { TimeSlotButtonType } from "models/theme";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSlot } from "state/atoms/selectedSlot";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import { slotsViewConfiguration } from "state/selectors/slotsViewConfiguration";
import { timeSlot } from "state/selectors/timeSlot";
import styled, { css } from "styled-components";

type TimeSlotButtonState = "available" | "unavailable" | "selected";

interface TimeSlotButtonProps {
  state: TimeSlotButtonType;
  showDuration: boolean;
  showQuantity: boolean;
}

const timeSlotHeight: Record<string, string> = {
  "true-true": "unset",
  "false-true": "unset",
  "true-false": "unset",
  "false-false": "unset",
};

const TimeSlotButton = styled.button<TimeSlotButtonProps>`
  all: unset;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 0;

  ${({ theme, state, showDuration, showQuantity }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton[state] as any;

    return css`
      color: ${colorSchema.text};
      cursor: ${state === "unavailable" ? "unset" : "pointer"};
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${colorSchema.background};
      min-width: ${showDuration ? "96px" : "unset"};
      min-height: ${timeSlotHeight[`${showDuration}-${showQuantity}`] ?? "unset"};
    `;
  }}

  &:hover {
    ${({ theme, state }) => {
      const colorSchema = theme.colorSchemas.timeSlotButton[state];
      return css`
        background-color: ${colorSchema.backgroundHover};
      `;
    }}
  }

  & > .unavailable-time-slot {
    text-decoration: line-through;
  }
`;

interface DummySlotProps {
  showDuration: boolean;
  showQuantity: boolean;
}

const dummyTimeSlotHeight: Record<string, string> = {
  "true-true": "70px",
  "false-true": "44px",
  "true-false": "54px",
  "false-false": "26px",
};

const DummySlotWrapper = styled.div<DummySlotProps>`
  width: 100%;
  border: 1px solid transparent;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, showDuration, showQuantity }) => {
    const colorSchema = theme.colorSchemas.timeSlotButton.unavailable as any;
    return css`
      color: ${colorSchema.text};
      height: ${dummyTimeSlotHeight[`${showDuration}-${showQuantity}`] ?? "38px"};
    `;
  }}
`;

const DummySlot: React.FC<DummySlotProps> = ({ showDuration, showQuantity }) => {
  return (
    <DummySlotWrapper showDuration={showDuration} showQuantity={showQuantity}>
      <Typography typographyType="h3" weight="500" as="span" align="center" color="inherit">
        -
      </Typography>
    </DummySlotWrapper>
  );
};

interface TimeSlotProps {
  dateFrom: string;
  dateTo: string;
  day: string;
  is12HoursSystem: boolean;
}

const getTimeSlotButtonState = (
  dateString: string,
  selectedDateString: string,
  isAvailable: boolean,
): TimeSlotButtonState => {
  if (dateString === selectedDateString) return "selected";

  if (isAvailable) return "available";

  return "unavailable";
};

const getBaseSlotContent = (
  slot: Slot,
  date: string,
  timeZone: string,
  is12HoursSystem: boolean,
  service?: Service,
) => {
  if (!service?.project.localTimeZone) return;

  return (
    <Typography
      typographyType="h3"
      weight="500"
      as="span"
      align="center"
      className={slot.quantity > 0 ? "" : "unavailable-time-slot"}
      color="inherit"
    >
      {convertSourceDateTimeToTargetDateTimeWithHoursSystem({
        date,
        targetTimeZone: timeZone,
        sourceTimeZone: service.project.localTimeZone,
        is12HoursSystem,
      })}
    </Typography>
  );
};

const QuantityText = styled(Typography)`
  font-size: 10px;
  line-height: 12px;
  margin: 2px 0;
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
    line-height: 6px;
  }
`;

const getDurationQuantitySlotContent = (
  slot: Slot,
  date: string,
  t: TFunction<"translation">,
  timeZone: string,
  is12HoursSystem: boolean,
  service?: Service,
) => {
  if (!service?.project.localTimeZone) return;

  return (
    <Column>
      <DurationText
        typographyType="body"
        weight="500"
        as="span"
        align="center"
        className={slot.quantity > 0 ? "" : "unavailable-time-slot"}
        color="inherit"
      >
        <WrapperWithDuration>
          <span>
            {convertSourceDateTimeToTargetDateTimeWithHoursSystem({
              date,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              is12HoursSystem,
            })}
          </span>
          <em>-</em>
          <span>
            {convertSourceDateTimeToTargetDateTimeWithHoursSystem({
              date: slot.dateTimeTo,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              is12HoursSystem,
            })}
          </span>
        </WrapperWithDuration>
      </DurationText>
      {slot.quantity > 0 && (
        <>
          <QuantityText typographyType="body" weight="500" as="span" align="center" color="inherit">
            {t("available")} {slot.quantity > 999 ? "999+" : slot.quantity.toFixed(0)}
          </QuantityText>
        </>
      )}
    </Column>
  );
};
const getQuantitySlotContent = (
  slot: Slot,
  date: string,
  t: TFunction<"translation">,
  timeZone: string,
  is12HoursSystem: boolean,
  service?: Service,
) => {
  if (!service?.project.localTimeZone) return;

  return (
    <Column>
      <DurationText
        typographyType="body"
        weight="500"
        as="span"
        align="center"
        className={slot.quantity > 0 ? "" : "unavailable-time-slot"}
        color="inherit"
      >
        {convertSourceDateTimeToTargetDateTimeWithHoursSystem({
          date,
          targetTimeZone: timeZone,
          sourceTimeZone: service.project.localTimeZone,
          is12HoursSystem,
        })}
      </DurationText>
      {slot.quantity > 0 && (
        <>
          <QuantityText typographyType="body" weight="500" as="span" align="center" color="inherit">
            {t("available")} {slot.quantity > 999 ? "999+" : slot.quantity.toFixed(0)}
          </QuantityText>
        </>
      )}
    </Column>
  );
};

const getDurationSlotContent = (
  slot: Slot,
  date: string,
  t: TFunction<"translation">,
  timeZone: string,
  is12HoursSystem: boolean,
  service?: Service,
) => {
  if (!service?.project.localTimeZone) return;

  return (
    <Column>
      <DurationText
        typographyType="body"
        weight="500"
        as="span"
        align="center"
        className={slot.quantity > 0 ? "" : "unavailable-time-slot"}
        color="inherit"
      >
        <WrapperWithDuration>
          <span>
            {convertSourceDateTimeToTargetDateTimeWithHoursSystem({
              date,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              is12HoursSystem,
            })}
          </span>
          <em>-</em>
          <span>
            {convertSourceDateTimeToTargetDateTimeWithHoursSystem({
              date: slot.dateTimeTo,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              is12HoursSystem,
            })}
          </span>
        </WrapperWithDuration>
      </DurationText>
    </Column>
  );
};

const TimeSlot: React.FC<TimeSlotProps> = ({ dateFrom, dateTo, day, is12HoursSystem }) => {
  const slot = useRecoilValue(timeSlot({ from: dateFrom, to: dateTo }));
  const [selected, setSelectedSlot] = useRecoilState(selectedSlot);
  const { showDuration, showQuantity } = useRecoilValue(slotsViewConfiguration);
  const { t } = useTranslation();
  const timeZone = useRecoilValue(timeZoneAtom);
  const service = useRecoilValue(serviceAtom);

  return (
    <Column mt={0.5} mb={0.5} w="100%">
      {!slot ? (
        <DummySlot showDuration={showDuration} showQuantity={showQuantity} />
      ) : (
        <TimeSlotButton
          showDuration={showDuration}
          showQuantity={showQuantity}
          state={getTimeSlotButtonState(dateFrom, selected, slot.quantity > 0)}
          disabled={slot.quantity === 0}
          onClick={() => {
            setSelectedSlot(dateFrom);
          }}
        >
          {showDuration &&
            showQuantity &&
            getDurationQuantitySlotContent(slot, dateFrom, t, timeZone, is12HoursSystem, service)}
          {showDuration &&
            !showQuantity &&
            getDurationSlotContent(slot, dateFrom, t, timeZone, is12HoursSystem, service)}
          {!showDuration &&
            showQuantity &&
            getQuantitySlotContent(slot, dateFrom, t, timeZone, is12HoursSystem, service)}
          {!showDuration && !showQuantity && getBaseSlotContent(slot, dateFrom, timeZone, is12HoursSystem, service)}
        </TimeSlotButton>
      )}
    </Column>
  );
};

export default TimeSlot;
