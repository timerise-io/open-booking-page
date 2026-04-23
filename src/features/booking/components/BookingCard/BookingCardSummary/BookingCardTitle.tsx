import { useEffect } from "react";
import { LinkButton } from "components/LinkButton";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions/getDatesValue";
import { useLocale } from "helpers/hooks/useLocale";
import { Booking } from "models/booking";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useBookingStore, useUiStore } from "state/stores";
import styled from "styled-components";
import { IconCalendarEvent } from "@tabler/icons-react";
import { StyledRow } from "./BookingCardSummary.styled";

const StyledImg = styled.img`
  width: 48px;
  height: 48px;
`;

interface BookingCardTitleProps extends Pick<Booking, "paymentLink" | "dateTimeFrom" | "dateTimeTo"> {
  title: string;
  description: string;
  iconUrl: string;
  showDetails: boolean;
  showPayButton: boolean;
}

function BookingCardTitle({
  paymentLink,
  title,
  description,
  iconUrl,
  showDetails,
  showPayButton,
}: BookingCardTitleProps) {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const timeZone = useUiStore((state) => state.timeZone);
  const service = useBookingStore((state) => state.service)!;
  const booking = useBookingStore((state) => state.booking);
  const hoursSystem = useUiStore((state) => state.hoursSystem);
  const is12HoursSystem = hoursSystem === HOURS_SYSTEMS.h12;
  const bookingPaymentStatus = booking?.paymentStatus;
  const { paymentStatus } = useParams<{ paymentStatus: string }>();
  const [searchParams] = useSearchParams();
  const searchPaymentStatus = searchParams.get("paymentStatus");

  const isCanceled =
    searchPaymentStatus === "CANCELED" || paymentStatus === "CANCELED" || bookingPaymentStatus === "CANCELED";

  useEffect(() => {
    if (showPayButton && paymentLink && !isCanceled) {
      window.open(paymentLink, "_self")?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPayButton, paymentLink]);

  const slots = showDetails && booking?.slots?.length ? booking.slots : [];

  return (
    <>
      <StyledImg src={iconUrl} alt="status icon" />
      <Typography $typographyType="h2" as="h2" className="status-info">
        {title}
      </Typography>
      <Typography $typographyType="body" $align="center" className="status-description">
        {description}
      </Typography>

      {slots.map((slot) => (
        <StyledRow $jc="center" $gap="6px" key={`${slot.dateTimeFrom}-${slot.dateTimeTo}`}>
          <IconCalendarEvent />
          <Typography $typographyType="body" $align="center" $weight="700" $displayType="contents">
            {`${getDatesValue({
              service,
              dateTimeFrom: slot.dateTimeFrom,
              dateTimeTo: slot.dateTimeTo,
              targetTimeZone: timeZone,
              locale,
              is12HoursSystem,
            })} (${timeZone.replace("_", " ")})`}
          </Typography>
        </StyledRow>
      ))}
      {showPayButton && paymentLink && (
        <Box $mt={3.5}>
          <LinkButton href={paymentLink} target="_blank">
            {t("pay")}
          </LinkButton>
        </Box>
      )}
    </>
  );
}

export default BookingCardTitle;
