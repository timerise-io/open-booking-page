import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";
import { IconWorld } from "@tabler/icons";
import { Box } from "components/layout/Box";
import styled from "styled-components";

const Wrapper = styled(Row)`
  color: #999999;
`;

const TimezoneInfo = () => {
  const { t } = useTranslation();
  const timeZone = useRecoilValue(timeZoneAtom);

  return (
    <Wrapper>
      <IconWorld size={16} />
      <Box w="4px" />
      <Typography typographyType="label" color="inherit" as="span">{`${t(
        "Timezone"
      )}: ${timeZone.replace("_", " ")}`}</Typography>
    </Wrapper>
  );
};

export default TimezoneInfo;
