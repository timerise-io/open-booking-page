import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { BOOKING_FORM_TYPES } from "models/service";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";

export const RescheduleBookingButton = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const { PAGES } = useIsEmbeddedPage();
  const service = useRecoilValue(serviceAtom);
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());

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
              query: `?${createSearchParams(urlSearchParams).toString()}`,
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
