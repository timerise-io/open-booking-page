import { useContext } from "react";
import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { GTMContext } from "features/analytics/contexts/GTMContext";
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
  const { sendEvent } = useContext(AnalyticsContext);
  const { action } = useContext(GTMContext);

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

        sendEvent({
          category: "navigation",
          action: "Back To Service Button",
          label: t("go-back"),
        });

        action({ event: "navigation", action: "Back To Service Button" });
      }}
    >
      <Typography typographyType="body" align="center" as="span" color="inherit" weight="700">
        {t("go-back")}
      </Typography>
    </ContextButton>
  );
};

export default BackToServiceButton;
