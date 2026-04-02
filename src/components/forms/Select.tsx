import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { IconChevronDown } from "@tabler/icons-react";

const SelectBase = styled.select`
  margin: 0;
  padding: 3px 44px 3px 10px;
  outline: none;
  appearance: none;
  position: relative;
  z-index: 99;
  background-color: unset;
  font-size: 13px;
  line-height: 15.73px;
  ${({ theme }) => css`
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colorSchemas.input.border};
    color: ${theme.colors.dark};
    size: ${theme.typography.body.size};
    weight: ${theme.typography.body.weight};
    line-height: ${theme.typography.body.lineHeight};

    &:hover {
      border: 1px solid ${theme.colorSchemas.input.borderHover};
      cursor: pointer;
    }
  `}
`;

const WrapperDiv = styled.div`
  position: relative;

  & > svg {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 5px;
    right: 9px;
    size: 10px;
    z-index: 99;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 1px;
    width: 100%;
    height: calc(100% - 2px);
    ${({ theme }) => css`
      border-radius: ${theme.borderRadius};
      background-color: ${theme.colorSchemas.input.background};
    `};
  }
`;

interface SelectProps {
  onChange: (value: string) => void;
  defaultValue?: string;
}

const Select: React.FC<PropsWithChildren<SelectProps>> = ({ onChange, defaultValue, children }) => {
  return (
    <WrapperDiv>
      <IconChevronDown />
      <SelectBase
        onChange={(e) => {
          onChange(e.target.value);
        }}
        defaultValue={defaultValue}
      >
        {children}
      </SelectBase>
    </WrapperDiv>
  );
};

export default Select;
