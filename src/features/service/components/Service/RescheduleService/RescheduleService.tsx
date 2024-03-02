import React, { useEffect, useMemo, useState } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useLangParam } from "features/i18n/useLangParam";
import { useBookingsRangeCount } from "features/service/hooks";
import { useRescheduleBooking } from "features/service/hooks/useRescheduleBooking";
import { getIsSlotsWithinRange, getPath, getServiceConfigByType } from "helpers/functions";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { BOOKING_FORM_TYPES } from "models/service";
import { PAGES } from "pages/constans";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import { bookingAtom } from "state/atoms/booking";
import { selectedDateRange } from "state/atoms/selectedDateRange";
import { selectedSlots } from "state/atoms/selectedSlots";
import { serviceAtom } from "state/atoms/service";
import { slotsAtom } from "state/atoms/slots";
import { timeZoneAtom } from "state/atoms/timeZone";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";
import { getSubmitButtonText } from "../BookService/helpers";
import { HOURS_SYSTEMS } from "../HoursSystem/enums/HoursSystem.enum";

const StyledWarning = styled.div`
  margin: 15px 0 8px 0;
  display: flex;
  background: #fef6f5;
  border: 1px solid #ea4335;
  border-radius: 4px;
  padding: 8px;
  gap: 8px;
  color: #ea4335;

  & > .info-text {
    width: fit-content;
  }
`;

const WrapperCard = styled(Card)`
  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const StyledDateValue = styled(Typography)`
  margin-left: 4px;
  display: inline;
`;

const StyledButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RescheduleService = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [slotsOutOfRange, setSlotsOutOfRange] = useState(false);
  const locale = useLocale();
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const lang = useLangParam();
  const { t } = useTranslation(["forms"]);
  const selectedDateRangeValue = useRecoilValue(selectedDateRange);
  const selectedSlotsValue = useRecoilValue(selectedSlots);
  const service = useRecoilValue(serviceAtom)!;
  const serviceConfig = service && getServiceConfigByType({ service });
  const slot = useRecoilValue(selectedSlotSelector);
  const { rescheduleBookingMutation, loading } = useRescheduleBooking();
  const timeZone = useRecoilValue(timeZoneAtom);
  const slots = useRecoilValue(slotsAtom)!;

  const viewConfig = service?.viewConfig;
  const serviceType = viewConfig?.displayType;

  const { minSelect, maxSelect } = useBookingsRangeCount({ viewConfig });

  const isSlotType = serviceType === BOOKING_FORM_TYPES.DAYS;
  const isDateRangeType = serviceType === BOOKING_FORM_TYPES.CALENDAR;
  const isEventType = serviceType === BOOKING_FORM_TYPES.LIST;

  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);
  const dateFormat = is12HoursSystem ? "iiii dd MMM, h:mm a" : "iiii dd MMM, H:mm";

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.slotId === selectedSlotsValue[0])!,
    [slots, selectedSlotsValue],
  );

  const formattedDateTo = selectedSlotsValue?.length
    ? convertSourceDateTimeToTargetDateTime({
        date: selectedSlot.dateTimeFrom,
        targetTimeZone: timeZone,
        sourceTimeZone: service.project.localTimeZone,
        dateFormat,
        locale,
      })
    : "";

  const formattedDateFrom =
    bookingValue &&
    convertSourceDateTimeToTargetDateTime({
      date: bookingValue.dateTimeFrom,
      targetTimeZone: timeZone,
      sourceTimeZone: service.project.localTimeZone,
      dateFormat,
      locale,
    });

  const handleSubmit = () => {
    if (isSlotType) {
      if (!selectedSlotsValue.length || bookingValue?.bookingId === undefined) return;
      rescheduleBookingMutation({
        variables: {
          bookingId: bookingValue.bookingId,
          slots: selectedSlotsValue,
        },
      });
    } else if (isDateRangeType) {
      if (!selectedSlotsValue.length || bookingValue?.bookingId === undefined) return;
      rescheduleBookingMutation({
        variables: {
          bookingId: bookingValue.bookingId,
          slots: selectedSlotsValue,
        },
      });
    } else if (isEventType) {
      if (!selectedSlotsValue.length || bookingValue?.bookingId === undefined) return;
      rescheduleBookingMutation({
        variables: {
          bookingId: bookingValue.bookingId,
          slots: selectedSlotsValue,
        },
      });
    }
  };

  const checkDisableButton = useMemo(() => {
    const disabledForSlots = !selectedSlotsValue.length || loading;
    const disabledForDateRange =
      selectedDateRangeValue.dateTimeFrom === null || selectedDateRangeValue.dateTimeTo === null;

    const isSlotWithinRange = getIsSlotsWithinRange({
      selectedSlotsLength: selectedSlotsValue.length,
      viewConfig,
    });

    setSlotsOutOfRange(!isSlotWithinRange);

    return (
      !isSlotWithinRange ||
      (isSlotType && disabledForSlots) ||
      (isDateRangeType && disabledForDateRange) ||
      (isEventType && disabledForSlots)
    );
  }, [
    loading,
    selectedDateRangeValue.dateTimeFrom,
    selectedDateRangeValue.dateTimeTo,
    selectedSlotsValue.length,
    viewConfig,
    isSlotType,
    isDateRangeType,
    isEventType,
  ]);

  useEffect(() => {
    setIsTouched(selectedSlotsValue.length > 0);
  }, [selectedSlotsValue.length]);

  if (service === undefined || bookingValue === undefined) return null;

  return (
    <Box mt={1.125}>
      <WrapperCard>
        <Box mb={2.5}>
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t("headers.reschedule-booking")}
          </Typography>
        </Box>
        <Box>
          <Typography typographyType="label" displayType="contents">
            {t("from")}:
          </Typography>
          <StyledDateValue typographyType="label" weight="700" displayType="contents">
            {formattedDateFrom}
          </StyledDateValue>
        </Box>
        {slot && (
          <Box mt={0.5}>
            <Typography typographyType="label" displayType="contents">
              {t("to")}:
            </Typography>
            <StyledDateValue typographyType="label" weight="700" displayType="contents">
              {formattedDateTo}
            </StyledDateValue>
          </Box>
        )}
        <StyledButtonsWrapper mt={4}>
          {isTouched && slotsOutOfRange && (
            <StyledWarning>
              <IconInfoCircle size={20} color="#EA4335" />
              <Typography className="info-text" typographyType="body" as="span" color="inherit">
                {t("slots-out-of-range", { minSelect, maxSelect })}
              </Typography>
            </StyledWarning>
          )}
          <Button
            type="submit"
            buttonType="primary"
            disabled={checkDisableButton}
            data-cy="book-now-button"
            onClick={() => handleSubmit()}
          >
            {getSubmitButtonText({
              selectedSlotValue: formattedDateTo,
              selectedSlotsValue,
              t,
              serviceConfig,
            })}
          </Button>

          <Button
            type="submit"
            buttonType="secondary"
            data-cy="book-now-button"
            onClick={() => {
              navigate(
                getPath({
                  url: `${PAGES.BOOKING}:query`,
                  params: {
                    id: bookingValue.bookingId,
                    query: lang ? `?${createSearchParams({ locale: lang }).toString()}` : "",
                  },
                }),
              );
            }}
          >
            {t("back")}
          </Button>
        </StyledButtonsWrapper>
      </WrapperCard>
    </Box>
  );
};

export default RescheduleService;
