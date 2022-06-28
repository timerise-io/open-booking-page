import { ButtonType } from "models/theme";
import styled, { css } from "styled-components";

interface ButtonProps {
  buttonType: ButtonType;
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  width: -webkit-fill-available;
  text-align: center;
  cursor: pointer;
  ${({ theme, buttonType, disabled }) => {
    const colors = theme.colorSchemas.button[buttonType];
    const textColor = disabled
      ? colors.textDisabled ?? colors.text
      : colors.text;

    const border = colors.border ?? "unset";

    return css`
      background-color: ${disabled
        ? colors.backgroundDisabled
        : colors.background};
      color: ${textColor};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});
      border: ${border};

      &:hover,
      &:focus {
        background-color: ${disabled
          ? colors.backgroundDisabled
          : colors.backgroundActive};
      }
    `;
  }}
`;
