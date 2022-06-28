import styled, { css } from "styled-components";

export interface CardProps {
  padding?: string;
}

export const Card = styled.div<CardProps>`
  ${({ theme, padding }) => css`
    padding: ${padding ?? "20px"};
    background-color: ${theme.colorSchemas.background.primary.color};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
  `}
`;
