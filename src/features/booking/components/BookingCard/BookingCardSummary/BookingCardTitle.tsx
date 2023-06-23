import React from "react";
import { LinkButton } from "components/LinkButton";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { Booking } from "models/booking";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";
import { IconCalendarEvent } from "@tabler/icons";
import { StyledRow } from "./BookingCardSummary.styled";

const StyledImg = styled.img`
  width: 48px;
  height: 48px;
`;

interface BookingCardTitleProps extends Pick<Booking, "paymentLink" | "dateTimeFrom"> {
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
  const service = useRecoilValue(serviceAtom)!;

  return (
    <>
      <StyledImg src={iconUrl} alt="status icon" />
      <Typography typographyType="h2" as="h2" className="status-info">
        {title}
      </Typography>
      <Typography typographyType="body" align="center" className="status-description">
        {description}
      </Typography>
      {showDetails && (
        <StyledRow jc="center" gap="6px">
          <IconCalendarEvent />
          <Typography typographyType="body" align="center" weight="700" displayType="contents">
            {`${convertSourceDateTimeToTargetDateTime({
              date: dateTimeFrom,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              dateFormat: "iiii dd MMM yyyy, H:mm",
              locale,
            })} (${timeZone.replace("_", " ")})`}
          </Typography>
        </StyledRow>
      )}
      {showPayButton && paymentLink && (
        <Box mt={3.5}>
          <LinkButton href={paymentLink} target="_blank">
            {t("pay")}
          </LinkButton>
        </Box>
      )}
    </>
  );
};

export default BookingCardTitle;
