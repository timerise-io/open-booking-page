import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import React from "react";
import { useTranslation } from "react-i18next";
import { bookingAtom } from "state/atoms/booking";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { Row } from "components/layout/Row";
import { Box } from "components/layout/Box";
import styled from "styled-components";
import formatInTimeZone from "date-fns-tz/formatInTimeZone";
import { useLocale } from "helpers/hooks/useLocale";

const StyledTypography = styled(Typography)`
  & > strong {
    display: contents;
  }
`;

const DeleteBooking = () => {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const booking = useRecoilValue(bookingAtom)!;
  const service = useRecoilValue(serviceAtom)!;

  return (
    <Column ai="flex-start">
      <StyledTypography
        typographyType="body"
        displayType="contents"
        dangerouslySetInnerHTML={{
          __html: t("Are you sure you want to delete this booking?"),
        }}
      ></StyledTypography>
      <Box mt={2.5}>
        <Typography typographyType="body" displayType="contents">
          {service.title}
        </Typography>
      </Box>
      <Row>
        <Typography typographyType="body">{t("dateTime.accepted")}</Typography>
        <Box ml={0.5}>
          <Typography typographyType="body" weight="700">
            {" "}
            {formatInTimeZone(
              booking.dateTimeFrom,
              "UTC",
              "iiii dd MMM yyyy, H:mm",
              {
                locale,
              }
            )}
          </Typography>
        </Box>
      </Row>
    </Column>
  );
};

export default DeleteBooking;
