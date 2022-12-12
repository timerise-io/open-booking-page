import { ContextButton } from "components/ContextButton";
import { Column } from "components/layout/Column";
import { Typography } from "components/Typography";
import { useLangParam } from "features/i18n/useLangParam";
import { PAGES } from "pages/constans";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  generatePath,
  createSearchParams,
  useNavigate,
} from "react-router-dom";

interface BookingCardSummaryNewProps {
  serviceId: string;
}

const BookingCardSummaryNew = ({ serviceId }: BookingCardSummaryNewProps) => {
  const navigate = useNavigate();
  const lang = useLangParam();
  const { t } = useTranslation(["booking"]);
  return (
    <Column jc="center">
      <Typography typographyType="body" align="center">
        {t("Want to book another date?")}
      </Typography>
      <ContextButton
        colorType="primary"
        onClick={() =>
          navigate(
            generatePath(`${PAGES.SERVICE}:query`, {
              id: serviceId,
              query: lang ? `?${createSearchParams({ lang }).toString()}` : "",
            })
          )
        }
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
    </Column>
  );
};

export default BookingCardSummaryNew;
