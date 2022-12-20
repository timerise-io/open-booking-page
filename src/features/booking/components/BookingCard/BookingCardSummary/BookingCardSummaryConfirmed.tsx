import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { LinkButton } from "components/LinkButton";
import { Booking, Space as SpaceModel } from "models/booking";
import React from "react";
import { useTranslation } from "react-i18next";
import Space from "../Space";

type BookingCardSummaryConfirmedProps = Pick<Booking, "iCalUrl" | "qrUrl"> & {
  spaces: Array<SpaceModel>;
};

const BookingCardSummaryConfirmed = ({
  iCalUrl,
  qrUrl,
  spaces,
}: BookingCardSummaryConfirmedProps) => {
  const { t } = useTranslation(["booking"]);
  return (
    <Column w="100%" mt={2.5}>
      <Row>
        <LinkButton href={iCalUrl} download>
          {t("Add to your calendar")}
        </LinkButton>
        <LinkButton href={qrUrl} download="booking_qr.png" target="_blank">
          {t("Download QR code")}
        </LinkButton>
      </Row>
      {spaces.length > 0 && (
        <Box mt={5} w="100%">
          {spaces.map((item) => (
            <Space key={item.spaceId} space={item} />
          ))}
        </Box>
      )}
    </Column>
  );
};

export default BookingCardSummaryConfirmed;
