import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { BOOKING_FORM_TYPES } from "models/service";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";

export const RescheduleBookingButton = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const lang = useLangParam();
  const { PAGES } = useIsEmbeddedPage();
  const service = useRecoilValue(serviceAtom);

  if (bookingValue === undefined || service?.viewConfig?.displayType === BOOKING_FORM_TYPES.PREORDER) return null;

  return (
    <ContextButton
      colorType="primary"
      onClick={() => {
        navigate(
          getPath({
            url: `${PAGES.RESCHEDULE}:query`,
            params: {
              id: bookingValue.bookingId,
              query: lang ? `?${createSearchParams({ locale: lang }).toString()}` : "",
            },
          }),
        );
      }}
    >
      <Typography typographyType="body" align="center" as="span" color="inherit" weight="700">
        {t("reschedule")}
      </Typography>
    </ContextButton>
  );
};
