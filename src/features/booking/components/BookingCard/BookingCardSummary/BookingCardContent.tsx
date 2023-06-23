import { LinkButton } from "components/LinkButton";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Booking } from "models/booking";
import { useTranslation } from "react-i18next";

type BookingCardContentProps = Pick<Booking, "iCalUrl" | "qrUrl"> & {
  showCalendarButton: boolean;
  showQRButton: boolean;
};

const BookingCardContent = ({ iCalUrl, qrUrl, showCalendarButton, showQRButton }: BookingCardContentProps) => {
  const { t } = useTranslation(["booking"]);

  if (!showCalendarButton && !showQRButton) return null;

  return (
    <Column w="100%" mt={2.5}>
      <Row>
        {showCalendarButton && (
          <LinkButton href={iCalUrl} download>
            {t("add-to-calendar")}
          </LinkButton>
        )}
        {showQRButton && (
          <LinkButton href={qrUrl} download="booking_qr.png" target="_blank">
            {t("download-qr")}
          </LinkButton>
        )}
      </Row>
    </Column>
  );
};

export default BookingCardContent;
