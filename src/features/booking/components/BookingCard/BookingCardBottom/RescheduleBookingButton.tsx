import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
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

  if (bookingValue === undefined || service?.viewConfig?.displayType === BOOKING_FORM_TYPES.PREORDER) return null;

  return (
    <ContextButton
      $colorType="primary"
      onClick={() => {
        const queryString = createSearchParams(urlSearchParams).toString();
        const path = getPath({
          url: PAGES.RESCHEDULE,
          params: { id: bookingValue.bookingId },
        });
        navigate(queryString ? `${path}?${queryString}` : path);
      }}
    >
      <Typography $typographyType="body" $align="center" as="span" $color="inherit" $weight="700">
        {t("reschedule")}
      </Typography>
    </ContextButton>
  );
};
