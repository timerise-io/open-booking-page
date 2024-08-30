import React from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useRecoilValue } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";

const Wrapper = styled(Row)`
  /* color: #999999; */
  gap: 4px;
  .timezone-info {
    white-space: nowrap;
  }
`;

interface TimezoneInfoProps {
  showTimezone?: boolean;
}

const TimezoneInfo: React.FC<TimezoneInfoProps> = ({ showTimezone = true }) => {
  const timeZone = useRecoilValue(timeZoneAtom);

  if (!showTimezone) return null;

  return (
    <Wrapper>
      <Typography className="timezone-info" typographyType="label" color="inherit" as="span" weight="700">
        {timeZone.replace("_", " ")}
      </Typography>
    </Wrapper>
  );
};

export default TimezoneInfo;
