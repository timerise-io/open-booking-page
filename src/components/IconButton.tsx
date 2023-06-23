import styled from "styled-components";

export const IconButton = styled.button`
  all: unset;
  padding: ${({ theme }) => `calc(1.25 * ${theme.spacing})`};
  display: flex;
  border-radius: 50%;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colorSchemas.iconButton.primary.colorDisabled : theme.colorSchemas.iconButton.primary.color};
  transition: color 0.2s ease-in-out;

  &:active,
  &:hover {
    cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
    color: ${({ theme, disabled }) =>
      disabled
        ? theme.colorSchemas.iconButton.primary.colorDisabled
        : theme.colorSchemas.iconButton.primary.colorActive};
  }
`;
