import React, { useEffect, useMemo } from "react";
import { LinkButton } from "components/LinkButton";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions";
import { useLocale } from "helpers/hooks/useLocale";
import { Booking } from "models/booking";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";
import { IconCalendarEvent } from "@tabler/icons";
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

const BookingCardTitle = ({
  paymentLink,
  title,
  description,
  iconUrl,
  showDetails,
  showPayButton,
}: BookingCardTitleProps) => {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const timeZone = useRecoilValue(timeZoneAtom);
  const service = useRecoilValue(serviceAtom)!;
  const booking = useRecoilValue(bookingAtom);
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);
  const bookingPaymentStatus = booking?.paymentStatus;
  const { paymentStatus } = useParams<{ paymentStatus: string }>();

  const redirectToPayment = () => {
    if (!paymentLink || paymentStatus === "CANCELED" || bookingPaymentStatus === "CANCELED") return;

    window.open(paymentLink, "_self")?.focus();
  };

  useEffect(() => {
    if (showPayButton && paymentLink) {
      redirectToPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPayButton, paymentLink]);

  return (
    <>
      <StyledImg src={iconUrl} alt="status icon" />
      <Typography typographyType="h2" as="h2" className="status-info">
        {title}
      </Typography>
      <Typography typographyType="body" align="center" className="status-description">
        {description}
      </Typography>

      {showDetails &&
        booking?.slots &&
        booking?.slots.length > 0 &&
        booking.slots.map((slot) => (
          <StyledRow jc="center" gap="6px">
            <IconCalendarEvent />
            <Typography typographyType="body" align="center" weight="700" displayType="contents">
              {`${getDatesValue({
                service,
                dateTimeFrom: slot.dateTimeFrom,
                dateTimeTo: slot.dateTimeTo,
                targetTimeZone: timeZone,
                sourceTimeZone: service.project.localTimeZone,
                locale,
                is12HoursSystem,
              })} (${timeZone.replace("_", " ")})`}
            </Typography>
          </StyledRow>
        ))}
      {showPayButton && paymentLink && (
        <Box mt={3.5}>
          <LinkButton href={paymentLink} target="_blank">
            {t("pay")}
          </LinkButton>
        </Box>
      )}
    </>
  );
};

export default BookingCardTitle;
