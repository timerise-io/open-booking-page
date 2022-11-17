import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";
import { IconWorld } from "@tabler/icons";
import styled from "styled-components";

const Wrapper = styled(Row)`
  color: #999999;
  gap: 4px;
  .timezone-info {
    white-space: nowrap;
  }
`;

const TimezoneInfo = () => {
  const { t } = useTranslation();
  const timeZone = useRecoilValue(timeZoneAtom);

  return (
    <Wrapper>
      <IconWorld size={16} />
      <Typography
        className="timezone-info"
        typographyType="label"
        color="inherit"
        as="span"
      >{`${t("Timezone")}:`}</Typography>
      <Typography
        className="timezone-info"
        typographyType="label"
        color="inherit"
        as="span"
        weight="700"
      >
        {timeZone.replace("_", " ")}
      </Typography>
    </Wrapper>
  );
};

export default TimezoneInfo;
