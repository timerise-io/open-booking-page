import { Column } from "components/layout/Column";
import React, { ReactNode } from "react";
import {
  IconCalendarEvent,
  IconCircleCheck,
  IconCircleX,
  IconMailForward,
} from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { Typography } from "components/Typography";
import styled from "styled-components";
import { Row } from "components/layout/Row";
import { BookingStatus } from "models/booking";
import { generatePath, useNavigate } from "react-router";
import { PAGES } from "pages/constans";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { ContextButton } from "components/ContextButton";
import InfoBox from "components/InfoBox";
import Space from "./Space";
import { LinkButton } from "components/LinkButton";
import { Box } from "components/layout/Box";
import formatInTimeZone from "date-fns-tz/formatInTimeZone";
import { useLocale } from "helpers/hooks/useLocale";
import { useLangParam } from "features/i18n/useLangParam";
import { createSearchParams } from "react-router-dom";

const StyledColumn = styled(Column)`
  margin-top: 40px;

  .icon-draft {
    color: #fd842e;
  }

  .icon-accepted {
    color: #34a853;
  }

  .icon-deleted {
    color: #ea4335;
  }

  & > svg {
    width: 48px;
    height: 48px;
  }

  .status-info {
    margin-top: 10px;
    margin-bottom: 7px;
  }

  .status-description {
    margin-bottom: 10px;
  }
`;

const StyledRow = styled(Row)`
  flex-wrap: wrap;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

interface BookingCardSummaryProps {
  status: BookingStatus;
  dateTimeFrom: string;
}

const icons: Record<BookingStatus, ReactNode> = {
  NEW: <IconMailForward className="icon-draft" />,
  RENEWED: <IconMailForward className="icon-draft" />,
  ACCEPTED: <IconCircleCheck className="icon-accepted" />,
  CONFIRMED: <IconCircleCheck className="icon-accepted" />,
  CANCELED: <IconCircleX className="icon-deleted" />,
};

const BookingCardSummary: React.FC<BookingCardSummaryProps> = ({
  status,
  dateTimeFrom,
}) => {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const navigate = useNavigate();
  const booking = useRecoilValue(bookingAtom);
  const lang = useLangParam();

  return (
    <StyledColumn mb={5}>
      {icons[status]}
      <Typography typographyType="h2" as="h2" className="status-info">
        {t(`status.${status.toLocaleLowerCase()}`)}
      </Typography>
      <Typography
        typographyType="body"
        align="center"
        className="status-description"
      >
        {t(`description.${status.toLocaleLowerCase()}.${"both"}`)}
      </Typography>
      <StyledRow jc="center" gap="6px">
        <IconCalendarEvent />
        <Typography
          typographyType="body"
          align="center"
          weight="700"
          displayType="contents"
        >
          {formatInTimeZone(dateTimeFrom, "UTC", "iiii dd MMM yyyy, H:mm", {
            locale,
          })}
        </Typography>
      </StyledRow>
      {(status === "CONFIRMED" || status === "ACCEPTED") && booking && (
        <Column w="100%">
          <Row>
            <LinkButton href={booking.iCalUrl} download>
              Download .ics
            </LinkButton>
            <LinkButton
              href={booking.qrUrl}
              download="booking_qr.png"
              target="_blank"
            >
              QR code
            </LinkButton>
          </Row>
          {booking.service?.spaces && (
            <Box mt={5} w="100%">
              {booking.service?.spaces?.map((item) => (
                <Space key={item.spaceId} space={item} />
              ))}
            </Box>
          )}
        </Column>
      )}
      {booking && booking.status === "NEW" && (
        <Column jc="center">
          <Typography typographyType="body" align="center">
            {t("Want to book another date?")}
          </Typography>
          <ContextButton
            colorType="primary"
            onClick={() =>
              navigate(
                generatePath(`${PAGES.SERVICE}:query`, {
                  id: booking.service.serviceId,
                  query: lang
                    ? `?${createSearchParams({ lang }).toString()}`
                    : "",
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
      )}
    </StyledColumn>
  );
};

export default BookingCardSummary;
