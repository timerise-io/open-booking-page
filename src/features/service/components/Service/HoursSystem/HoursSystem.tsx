import React, { useContext } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import styled, { css } from "styled-components";
import { HOURS_SYSTEMS } from "./enums/HoursSystem.enum";

const Wrapper = styled(Row)`
  gap: 4px;
  border-radius: 4px;
  cursor: pointer;
  padding: 3px 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const HoursSystemButton = styled(Typography)<{ isBold: boolean }>`
  cursor: pointer;

  ${({ isBold }) => {
    return css`
      font-weight: ${isBold ? "700" : "normal"};
      text-decoration: ${isBold ? "underline" : "none"};
    `;
  }}
`;

export const HoursSystem = () => {
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const setHoursSystem = useSetRecoilState(hoursSystemAtom);
  const { sendEvent } = useContext(AnalyticsContext);

  const handleHoursSystemChange = () => {
    const newHoursSystem = hoursSystem === HOURS_SYSTEMS.h12 ? HOURS_SYSTEMS.h24 : HOURS_SYSTEMS.h12;
    localStorage.setItem("HOURS_SYSTEM", newHoursSystem);
    setHoursSystem(newHoursSystem);
    sendEvent({
      category: "Hours System",
      action: "Change Hours System",
      label: "Change Hours System",
      value: newHoursSystem === HOURS_SYSTEMS.h12 ? 12 : 24,
    });
  };

  return (
    <Wrapper onClick={handleHoursSystemChange}>
      <HoursSystemButton
        className="timezone-info"
        typographyType="label"
        color="inherit"
        as="span"
        isBold={hoursSystem === HOURS_SYSTEMS.h12}
      >
        12h
      </HoursSystemButton>
      <HoursSystemButton
        className="timezone-info"
        typographyType="label"
        color="inherit"
        as="span"
        isBold={hoursSystem === HOURS_SYSTEMS.h24}
      >
        24h
      </HoursSystemButton>
    </Wrapper>
  );
};
