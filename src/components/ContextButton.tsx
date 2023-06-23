import styled, { css } from "styled-components";

export const ContextButton = styled.button<{ colorType: "primary" | "danger" }>`
  all: unset;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7px 12px;

  ${({ theme, colorType, disabled }) => {
    const color = colorType === "danger" ? theme.colors.error : theme.colors.primary;
    const borderColor =
      colorType === "danger" ? theme.colors.error : theme.colorSchemas.timeSlotButton.available.border;
    const borderColorHover = colorType === "danger" ? theme.colors.error : theme.colors.darkGrey;

    return css`
      color: ${color};
      border: 1px solid ${borderColor};
      &:hover {
        border: 1px solid ${disabled ? borderColor : borderColorHover};
      }

      cursor: ${disabled ? "unset" : "pointer"};
    `;
  }}
`;
