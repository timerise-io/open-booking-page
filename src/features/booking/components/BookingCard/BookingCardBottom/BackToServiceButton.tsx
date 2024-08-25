import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { useLangParam } from "features/i18n/useLangParam";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";

const BackToServiceButton = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const lang = useLangParam();
  const { PAGES } = useIsEmbeddedPage();
  const setBooking = useSetRecoilState(bookingAtom);
  const service = useRecoilValue(serviceAtom);

  if (service === undefined) return null;

  return (
    <ContextButton
      colorType="primary"
      onClick={() => {
        setBooking(undefined);
        navigate(
          getPath({
            url: `${PAGES.SERVICE}:query`,
            params: {
              id: service.serviceId,
              query: lang ? `?${createSearchParams({ locale: lang }).toString()}` : "",
            },
          }),
        );
      }}
    >
      <Typography typographyType="body" align="center" as="span" color="inherit" weight="700">
        {t("go-back")}
      </Typography>
    </ContextButton>
  );
};

export default BackToServiceButton;
