import { IconInfoCircle } from "@tabler/icons";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Typography } from "./Typography";

const StyledInfo = styled.div`
  margin: 40px 0;
  display: flex;
  background: #f6f6f6;
  border-radius: 4px;
  padding: 8px;
  gap: 8px;

  & > .info-text {
    width: fit-content;
  }

  ${({ theme }) => {
    const border = theme.colorSchemas.input.border;
    const background = theme.colorSchemas.background.secondary.color;
    return css`
      border: 1px solid ${border};

      background: ${background};
    `;
  }}
`;

const InfoBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledInfo>
      <IconInfoCircle size={20} />
      <Typography className="info-text" typographyType="body" as="span">
        {children}
      </Typography>
    </StyledInfo>
  );
};

export default InfoBox;
