import { ButtonType } from "models/theme";
import styled, { css } from "styled-components";

interface ButtonProps {
  $buttonType: ButtonType;
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  width: -webkit-fill-available;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  ${({ theme, $buttonType, disabled }) => {
    const colors = theme.colorSchemas.button[$buttonType];
    const textColor = disabled ? (colors.textDisabled ?? colors.text) : colors.text;

    const border = colors.border ?? "unset";

    return css`
      background-color: ${disabled ? colors.backgroundDisabled : colors.background};
      color: ${textColor};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.75 * ${theme.spacing}) calc(2 * ${theme.spacing});
      border: ${border};
      transition: background-color 150ms ease;

      &:hover,
      &:focus {
        background-color: ${disabled ? colors.backgroundDisabled : colors.backgroundActive};
      }

      &:not(:disabled):focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }
    `;
  }}
`;
