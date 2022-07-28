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
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 1px 2px;
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
      padding: calc(1.25 * ${theme.spacing}) calc(1.5 * ${theme.spacing});
      border: ${border};

      &:hover,
      &:focus {
        background-color: ${disabled
          ? colors.backgroundDisabled
          : colors.backgroundActive};
        box-shadow: rgb(0 0 0 / 28%) 0px 1px 2px;
      }
    `;
  }}
`;
