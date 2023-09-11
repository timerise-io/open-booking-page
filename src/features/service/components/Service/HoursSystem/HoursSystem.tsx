import React from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import styled, { css } from "styled-components";
import { HOURS_SYSTEMS } from "./enums/HoursSystem.enum";

const Wrapper = styled(Row)`
  gap: 4px;
`;

const HoursSystemButton = styled(Typography)<{ isBold: boolean }>`
  cursor: pointer;

  ${({ isBold }) => {
    return css`
      font-weight: ${isBold ? "700" : "normal"};
      cursor: ${isBold ? "unset" : "pointer"};

      &:hover {
        text-decoration: ${isBold ? "none" : "underline"};
      }
    `;
  }}
`;

export const HoursSystem = () => {
  const { t } = useTranslation();
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const setHoursSystem = useSetRecoilState(hoursSystemAtom);

  const handleHoursSystemChange = (hoursSystem: string) => {
    localStorage.setItem("HOURS_SYSTEM", hoursSystem);
    setHoursSystem(hoursSystem);
  };

  return (
    <Wrapper>
      <Typography className="timezone-info" typographyType="label" color="inherit" as="span">{`${t(
        "format",
      )}:`}</Typography>
      <HoursSystemButton
        className="timezone-info"
        typographyType="label"
        color="inherit"
        as="span"
        isBold={hoursSystem === HOURS_SYSTEMS.h12}
        onClick={() => handleHoursSystemChange(HOURS_SYSTEMS.h12)}
      >
        12h
      </HoursSystemButton>
      <Typography className="timezone-info" typographyType="label" color="inherit" as="span">
        |
      </Typography>
      <HoursSystemButton
        className="timezone-info"
        typographyType="label"
        color="inherit"
        as="span"
        isBold={hoursSystem === HOURS_SYSTEMS.h24}
        onClick={() => handleHoursSystemChange(HOURS_SYSTEMS.h24)}
      >
        24h
      </HoursSystemButton>
    </Wrapper>
  );
};
