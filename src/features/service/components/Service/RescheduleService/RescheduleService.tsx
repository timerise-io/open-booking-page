import React from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useLangParam } from "features/i18n/useLangParam";
import { useRescheduleBooking } from "features/service/hooks/useRescheduleBooking";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { PAGES } from "pages/constans";
import { TFunction, useTranslation } from "react-i18next";
import { createSearchParams, generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { selectedSlot } from "state/atoms/selectedSlot";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import styled from "styled-components";

const getSubmitButtonText = (selectedSlotValue: string, t: TFunction<"forms"[]>) => {
  const textBase = t("reschedule-button");

  if (selectedSlotValue === "") return textBase;

  return `${textBase}: ${selectedSlotValue}`;
};

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
  const service = useRecoilValue(serviceAtom)!;
  const slot = useRecoilValue(selectedSlotSelector);
  const { rescheduleBookingMutation, loading } = useRescheduleBooking();
  const timeZone = useRecoilValue(timeZoneAtom);

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
    if (slot === undefined || bookingValue?.bookingId === undefined) return;

    rescheduleBookingMutation({
      variables: {
        bookingId: bookingValue.bookingId,
        slots: [slot.slotId],
      },
    });
  };

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
            disabled={selectedSlotValue === "" || loading}
            data-cy="book-now-button"
            onClick={() => handleSubmit()}
          >
            {getSubmitButtonText(formattedDateTo, t)}
          </Button>

          <Button
            type="submit"
            buttonType="secondary"
            data-cy="book-now-button"
            onClick={() => {
              navigate(
                generatePath(`${PAGES.BOOKING}:query`, {
                  id: bookingValue.bookingId,
                  query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
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
