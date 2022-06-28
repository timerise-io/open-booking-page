import styled, { css } from "styled-components";

const StyledInput = styled.input`
  all: unset;
  border-width: 1px;
  border-style: solid;
  ${({ theme }) => css`
    background-color: ${theme.colorSchemas.input.background};
    border-color: ${theme.colorSchemas.input.border};
    border-radius: ${theme.borderRadius};
    font-size: ${theme.typography.body.size};
    padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});

    &:hover {
      border-color: ${theme.colorSchemas.input.borderHover};
    }

    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;

export default StyledInput;
