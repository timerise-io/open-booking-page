import React, { useCallback } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useLangParam } from "features/i18n/useLangParam";
import { useRescheduleBooking } from "features/service/hooks/useRescheduleBooking";
import { getPath } from "helpers/functions";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { BOOKING_FORM_TYPES } from "models/service";
import { PAGES } from "pages/constans";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { selectedDateRange } from "state/atoms/selectedDateRange";
import { selectedSlot } from "state/atoms/selectedSlot";
import { selectedSlots } from "state/atoms/selectedSlots";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import styled from "styled-components";
import { getSubmitButtonText } from "../BookService/helpers";

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
  const locale = useLocale();
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const lang = useLangParam();
  const { t } = useTranslation(["forms"]);
  const selectedSlotValue = useRecoilValue(selectedSlot);
  const selectedDateRangeValue = useRecoilValue(selectedDateRange);
  const selectedSlotsValue = useRecoilValue(selectedSlots);
  const service = useRecoilValue(serviceAtom)!;
  const slot = useRecoilValue(selectedSlotSelector);
  const { rescheduleBookingMutation, loading } = useRescheduleBooking();
  const timeZone = useRecoilValue(timeZoneAtom);
  const serviceType = service?.viewConfig.displayType;

  const isSlotType = serviceType === BOOKING_FORM_TYPES.DAYS;
  const isDateRangeType = serviceType === BOOKING_FORM_TYPES.CALENDAR;
  const isEventType = serviceType === BOOKING_FORM_TYPES.LIST;

  const formattedDateTo =
    selectedSlotValue &&
    convertSourceDateTimeToTargetDateTime({
      date: selectedSlotValue,
      targetTimeZone: timeZone,
      sourceTimeZone: service.project.localTimeZone,
      dateFormat: "iiii dd MMM, H:mm",
      locale,
    });

  const formattedDateFrom =
    bookingValue &&
    convertSourceDateTimeToTargetDateTime({
      date: bookingValue.dateTimeFrom,
      targetTimeZone: timeZone,
      sourceTimeZone: service.project.localTimeZone,
      dateFormat: "iiii dd MMM, H:mm",
      locale,
    });

  const handleSubmit = () => {
    if (isSlotType) {
      if (slot === undefined || bookingValue?.bookingId === undefined) return;
      rescheduleBookingMutation({
        variables: {
          bookingId: bookingValue.bookingId,
          slots: [slot.slotId],
        },
      });
    } else if (isDateRangeType) {
      if (slot === undefined || bookingValue?.bookingId === undefined) return;
      rescheduleBookingMutation({
        variables: {
          bookingId: bookingValue.bookingId,
          slots: [slot.slotId],
        },
      });
    } else if (isEventType) {
      if (bookingValue?.bookingId === undefined) return;
      rescheduleBookingMutation({
        variables: {
          bookingId: bookingValue.bookingId,
          slots: selectedSlotsValue,
        },
      });
    }
  };

  const checkDisableButton = useCallback(() => {
    const disabledForSlot = selectedSlotValue === "" || loading;
    const disabledForSlots = !selectedSlotsValue.length || loading;
    const disabledForDateRange =
      selectedDateRangeValue.dateTimeFrom === null || selectedDateRangeValue.dateTimeTo === null;

    return (
      (isSlotType && disabledForSlot) || (isDateRangeType && disabledForDateRange) || (isEventType && disabledForSlots)
    );
  }, [
    selectedSlotValue,
    loading,
    selectedDateRangeValue.dateTimeFrom,
    selectedDateRangeValue.dateTimeTo,
    selectedSlotsValue,
    isSlotType,
    isDateRangeType,
    isEventType,
  ]);

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
          <Button
            type="submit"
            buttonType="primary"
            disabled={checkDisableButton()}
            data-cy="book-now-button"
            onClick={() => handleSubmit()}
          >
            {getSubmitButtonText({
              selectedSlotValue: formattedDateTo,
              selectedSlotsValue,
              t,
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
                    query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
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
