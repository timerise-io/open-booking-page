import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { LinkButton } from "components/LinkButton";
import { Booking } from "models/booking";
import React from "react";
import { useTranslation } from "react-i18next";

type BookingCardContentProps = Pick<Booking, "iCalUrl" | "qrUrl"> & {
  showCalendarButton: boolean;
  showQRButton: boolean;
};

const BookingCardContent = ({
  iCalUrl,
  qrUrl,
  showCalendarButton,
  showQRButton,
}: BookingCardContentProps) => {
  const { t } = useTranslation(["booking"]);

  if (!showCalendarButton && !showQRButton) return null;

  return (
    <Column w="100%" mt={2.5}>
      <Row>
        {showCalendarButton && (
          <LinkButton href={iCalUrl} download>
            {t("Add to your calendar")}
          </LinkButton>
        )}
        {showQRButton && (
          <LinkButton href={qrUrl} download="booking_qr.png" target="_blank">
            {t("Download QR code")}
          </LinkButton>
        )}
      </Row>
    </Column>
  );
};

export default BookingCardContent;
