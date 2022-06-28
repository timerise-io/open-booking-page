import styled, { css } from "styled-components";

export const CardButton = styled.button`
  all: unset;
  box-sizing: border-box;
  white-space: nowrap;
  margin: 5px;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  padding: 10px 12px;
  ${({ theme }) => {
    const colors = theme.colorSchemas.button.secondary;
    const border = colors.border ?? "unset";

    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
      color: ${colors.text};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      border: ${border};

      &:hover,
      &:focus {
        border: 1px solid #999999;
      }
    `;
  }}
`;
