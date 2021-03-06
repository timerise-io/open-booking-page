import { Typography } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useConfirmBooking } from "../hooks/useConfirmBooking";

function BookingConfirmation() {
  const { id } = useParams<{ id: string }>();
  useConfirmBooking(id!);
  const { t } = useTranslation();

  return (
    <div>
      <Typography typographyType="h2" weight="400">
        {t("loadingInfo")}
      </Typography>
    </div>
  );
}

export default BookingConfirmation;
