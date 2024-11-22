import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { getPath } from "helpers/functions";
import { useIsEmbeddedPage } from "helpers/hooks/useIsEmbeddedPage";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";

const BackToServiceButton = () => {
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const { PAGES } = useIsEmbeddedPage();
  const setBooking = useSetRecoilState(bookingAtom);
  const service = useRecoilValue(serviceAtom);
  const [searchParams] = useSearchParams();
  const urlSearchParams = Object.fromEntries(searchParams.entries());

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
              query: `?${createSearchParams(urlSearchParams).toString()}`,
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
