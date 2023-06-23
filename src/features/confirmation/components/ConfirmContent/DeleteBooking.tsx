import React from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";
import { serviceAtom } from "state/atoms/service";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";

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
  const timeZone = useRecoilValue(timeZoneAtom);

  return (
    <Column ai="flex-start">
      <StyledTypography
        typographyType="body"
        displayType="contents"
        dangerouslySetInnerHTML={{
          __html: t("want-to-delete"),
        }}
      ></StyledTypography>
      <Box mt={2.5}>
        <Typography typographyType="body" displayType="contents">
          {service.title}
        </Typography>
      </Box>
      <Row>
        <Typography typographyType="body">{t("date-and-time")}</Typography>
        <Box ml={0.5}>
          <Typography typographyType="body" weight="700">
            {" "}
            {convertSourceDateTimeToTargetDateTime({
              date: booking.dateTimeFrom,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              dateFormat: "iiii dd MMM yyyy, H:mm",
              locale,
            })}
          </Typography>
        </Box>
      </Row>
    </Column>
  );
};

export default DeleteBooking;
