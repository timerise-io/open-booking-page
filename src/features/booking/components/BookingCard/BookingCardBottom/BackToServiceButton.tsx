import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { useLangParam } from "features/i18n/useLangParam";
import { PAGES } from "pages/constans";
import { useTranslation } from "react-i18next";
import {
  useNavigate,
  generatePath,
  createSearchParams,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";

const BackToServiceButton = () => {
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
          generatePath(`${PAGES.SERVICE}:query`, {
            id: bookingValue.service.serviceId,
            query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
          })
        );
      }}
    >
      <Typography
        typographyType="body"
        align="center"
        as="span"
        color="inherit"
        weight="700"
      >
        {t("Go back to booking")}
      </Typography>
    </ContextButton>
  );
};

export default BackToServiceButton;
