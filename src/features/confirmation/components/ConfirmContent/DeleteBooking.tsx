import React, { useMemo } from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { HOURS_SYSTEMS } from "features/service/components/Service/HoursSystem/enums/HoursSystem.enum";
import { getDatesValue } from "helpers/functions";
import { useLocale } from "helpers/hooks/useLocale";
import { useTranslation } from "react-i18next";
import { useBookingStore, useUiStore } from "state/stores";
import styled from "styled-components";

const StyledTypography = styled(Typography)`
  & > strong {
    display: contents;
  }
`;

const DeleteBooking = () => {
  const locale = useLocale();
  const { t } = useTranslation(["booking"]);
  const booking = useBookingStore((state) => state.booking)!;
  const service = useBookingStore((state) => state.service)!;
  const timeZone = useUiStore((state) => state.timeZone);
  const hoursSystem = useUiStore((state) => state.hoursSystem);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);

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
        <Typography typographyType="body">{t("date-and-time")}:</Typography>
        <Box ml={0.5}>
          <Typography typographyType="body" weight="700">
            {" "}
            {getDatesValue({
              service,
              dateTimeFrom: booking.dateTimeFrom,
              dateTimeTo: booking.dateTimeTo,
              targetTimeZone: timeZone,
              sourceTimeZone: service.project.localTimeZone,
              locale,
              is12HoursSystem,
            })}
          </Typography>
        </Box>
      </Row>
    </Column>
  );
};

export default DeleteBooking;
