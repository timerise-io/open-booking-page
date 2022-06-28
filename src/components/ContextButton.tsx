import styled, { css } from "styled-components";

export const ContextButton = styled.button<{ colorType: "primary" | "danger" }>`
  all: unset;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7px 12px;
  cursor: pointer;

  ${({ theme, colorType }) => {
    const color =
      colorType === "danger" ? theme.colors.error : theme.colors.primary;
    const borderColor =
      colorType === "danger"
        ? theme.colors.error
        : theme.colorSchemas.input.borderHover;
    const borderColorHover =
      colorType === "danger" ? theme.colors.error : theme.colors.primary;

    return css`
      color: ${color};
      border: 1px solid ${borderColor};
      &:hover {
        border: 1px solid ${borderColorHover};
      }
    `;
  }}
`;
