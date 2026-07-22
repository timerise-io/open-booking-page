import styled, { css } from "styled-components";

const StyledInput = styled.input`
  all: unset;
  border-width: 1px;
  border-style: solid;
  &::placeholder {
    color: #666;
  }
  ${({ theme }) => css`
    background-color: ${theme.colorSchemas.input.background};
    border-color: ${theme.colorSchemas.input.border};
    border-radius: ${theme.borderRadius};
    font-size: ${theme.typography.body.size};
    padding: calc(1.25 * ${theme.spacing}) calc(1.375 * ${theme.spacing});
    transition: border-color 150ms ease;

    &:hover {
      border-color: ${theme.colorSchemas.input.borderHover};
    }

    &:focus-visible {
      border-color: ${theme.colors.primary};
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 1px;
    }

    ${theme.mediaBelow(theme.breakpoints.md)} {
      /* >=16px prevents iOS Safari auto-zoom on focus */
      font-size: 1rem;
      padding: calc(1.5 * ${theme.spacing}) calc(1.375 * ${theme.spacing});
    }
  `}
`;

export default StyledInput;
