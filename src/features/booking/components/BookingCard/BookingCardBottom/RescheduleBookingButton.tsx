import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { PAGES } from "pages/constans";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";

export const RescheduleBookingButton = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const bookingValue = useRecoilValue(bookingAtom);
  const lang = useLangParam();

  if (bookingValue === undefined) return null;

  return (
    <ContextButton
      colorType="primary"
      onClick={() => {
        navigate(
          getPath({
            url: `${PAGES.RESCHEDULE}:query`,
            params: {
              id: bookingValue.bookingId,
              query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
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
