import { useContext } from "react";
import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { BOOKING_FORM_TYPES } from "models/service";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBookingStore } from "state/stores";

export const RescheduleBookingButton = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const bookingValue = useBookingStore((state) => state.booking);
  const { PAGES } = useIsEmbeddedPage();
  const service = useBookingStore((state) => state.service);
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());
  const { sendEvent } = useContext(AnalyticsContext);

  if (bookingValue === undefined || service?.viewConfig?.displayType === BOOKING_FORM_TYPES.PREORDER) return null;

  return (
    <ContextButton
      $colorType="primary"
      onClick={() => {
        navigate(
          getPath({
            url: `${PAGES.RESCHEDULE}:query`,
            params: {
              id: bookingValue.bookingId,
              query: `?${createSearchParams(urlSearchParams).toString()}`,
            },
          }),
        );
        sendEvent({
          category: "navigation",
          action: "Reschedule Booking Button",
          label: t("reschedule"),
        });
      }}
    >
      <Typography $typographyType="body" $align="center" as="span" $color="inherit" $weight="700">
        {t("reschedule")}
      </Typography>
    </ContextButton>
  );
};
