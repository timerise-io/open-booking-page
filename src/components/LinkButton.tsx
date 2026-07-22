import styled, { css } from "styled-components";

/** Shared look of the secondary card action buttons (LinkButton / CardButton). */
export const cardButtonStyles = css`
  all: unset;
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

      &:hover {
        border: 1px solid #999999;
      }

      ${theme.mediaBelow(theme.breakpoints.md)} {
        /* match the 44px ContextButton height on mobile */
        line-height: 1.25rem;
        padding: 11px 12px;
      }
    `;
  }}
`;

export const LinkButton = styled.a`
  ${cardButtonStyles}
`;
