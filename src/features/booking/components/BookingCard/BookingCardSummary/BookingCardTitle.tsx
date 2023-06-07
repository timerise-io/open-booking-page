import { Typography } from "components/Typography";
import { formatInTimeZone } from "date-fns-tz";
import { useLocale } from "helpers/hooks/useLocale";
import { Booking } from "models/booking";
import React from "react";
import { useRecoilValue } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";
import { StyledRow } from "./BookingCardSummary.styled";
import { IconCalendarEvent } from "@tabler/icons";
import styled from "styled-components";
import { Box } from "components/layout/Box";
import { LinkButton } from "components/LinkButton";
import { useTranslation } from "react-i18next";

const StyledImg = styled.img`
  width: 48px;
  height: 48px;
`;

interface BookingCardTitleProps
  extends Pick<Booking, "paymentLink" | "dateTimeFrom"> {
  title: string;
  description: string;
  iconUrl: string;
  showDetails: boolean;
  showPayButton: boolean;
}

const BookingCardTitle = ({
  paymentLink,
  dateTimeFrom,
  title,
  description,
  iconUrl,
  showDetails,
  showPayButton,
}: BookingCardTitleProps) => {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const timeZone = useRecoilValue(timeZoneAtom);

  return (
    <>
      <StyledImg src={iconUrl} alt="status icon" />
      <Typography typographyType="h2" as="h2" className="status-info">
        {title}
      </Typography>
      <Typography
        typographyType="body"
        align="center"
        className="status-description"
      >
        {description}
      </Typography>
      {showDetails && (
        <StyledRow jc="center" gap="6px">
          <IconCalendarEvent />
          <Typography
            typographyType="body"
            align="center"
            weight="700"
            displayType="contents"
          >
            {`${formatInTimeZone(
              dateTimeFrom,
              timeZone,
              "iiii dd MMM yyyy, H:mm",
              {
                locale,
              }
            )} (${timeZone.replace("_", " ")})`}
          </Typography>
        </StyledRow>
      )}
      {showPayButton && paymentLink && (
        <Box mt={3.5}>
          <LinkButton href={paymentLink} target="_blank">{t("pay")}</LinkButton>
        </Box>
      )}
    </>
  );
};

export default BookingCardTitle;
