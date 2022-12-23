import { Typography } from "components/Typography";
import { formatInTimeZone } from "date-fns-tz";
import { useLocale } from "helpers/hooks/useLocale";
import { Booking, BookingStatus, PaymentStatus } from "models/booking";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";
import { StyledRow } from "./BookingCardSummary.styled";
import {
  IconCalendarEvent,
  IconCircleCheck,
  IconCircleX,
  IconMailForward,
  IconCreditCard,
} from "@tabler/icons";
import { LinkButton } from "components/LinkButton";
import { Box } from "components/layout/Box";

function getInfoStatus(
  status: BookingStatus,
  paymentStatus: PaymentStatus | null
): BookingStatus | "PAYMENT" {
  if (paymentStatus === null || status === "CANCELED") return status;

  return paymentStatus !== "SUCCEEDED" ? "PAYMENT" : "ACCEPTED";
}

const icons: Record<BookingStatus | "PAYMENT", ReactNode> = {
  NEW: <IconMailForward className="icon-draft" />,
  REBOOKED: <IconMailForward className="icon-draft" />,
  ACCEPTED: <IconCircleCheck className="icon-accepted" />,
  CONFIRMED: <IconCircleCheck className="icon-accepted" />,
  CANCELED: <IconCircleX className="icon-deleted" />,
  PAYMENT: <IconCreditCard className="icon-draft" />,
};

type BookingCardTitleProps = Pick<
  Booking,
  "status" | "paymentLink" | "dateTimeFrom" | "paymentStatus"
>;

const BookingCardTitle = ({
  status,
  paymentLink,
  dateTimeFrom,
  paymentStatus,
}: BookingCardTitleProps) => {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const timeZone = useRecoilValue(timeZoneAtom);

  const statusWithPayments = getInfoStatus(status, paymentStatus);

  return (
    <>
      {icons[statusWithPayments]}
      <Typography typographyType="h2" as="h2" className="status-info">
        {t(`status.${statusWithPayments.toLocaleLowerCase()}`)}
      </Typography>
      <Typography
        typographyType="body"
        align="center"
        className="status-description"
      >
        {t(`description.${statusWithPayments.toLocaleLowerCase()}.${"both"}`)}
      </Typography>
      <StyledRow jc="center" gap="6px">
        <IconCalendarEvent />
        <Typography
          typographyType="body"
          align="center"
          weight="700"
          displayType="contents"
        >
          {`${formatInTimeZone(dateTimeFrom, "UTC", "iiii dd MMM yyyy, H:mm", {
            locale,
          })} (${timeZone.replace("_", " ")})`}
        </Typography>
      </StyledRow>
      {statusWithPayments === "PAYMENT" && paymentLink && (
        <Box mt={3.5}>
          <LinkButton href={paymentLink}>{t("Go to payment")}</LinkButton>
        </Box>
      )}
    </>
  );
};

export default BookingCardTitle;
