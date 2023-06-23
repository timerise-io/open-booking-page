import React, { useCallback, useRef, useState } from "react";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import styled from "styled-components";
import { IconCheck, IconChevronDown } from "@tabler/icons";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";
import { Row } from "./layout/Row";

const SelectWrapper = styled(Column)`
  position: relative;
  width: fit-content;

  .hidden {
    display: none;
  }
`;

const OpenListButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);

  &:hover {
    cursor: pointer;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.28);
  }

  .chevron {
    width: 15px;
    height: 15px;
    margin: auto 0 auto 24px;
  }

  .label-value {
    max-width: 135px;
  }
`;

const StyledLabel = styled(Typography)`
  margin: 0;
`;

const StyledValue = styled(Typography)`
  margin: 0 0 0 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const OptionsWrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: calc(100% - 4px);
  min-width: 100%;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const OptionButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  margin: 4px 0;
  padding: 8px 12px;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: #f6f6f6;
  }

  & > span {
    margin: 0;
    white-space: nowrap;
  }
`;

interface SelectProps {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback(() => setIsOpen(false), []);
  useOnClickOutside(ref, memoizedCallback);

  const handleChange = (newSelectedKey: string) => {
    setIsOpen(false);
    onChange && onChange(newSelectedKey);
  };

  return (
    <SelectWrapper ai="flex-start">
      <OpenListButton onClick={() => setIsOpen(!isOpen)}>
        <Row className="label-value" jc="flex-start">
          {label && <StyledLabel typographyType="body">{label}:</StyledLabel>}
          <StyledValue typographyType="body" weight="700">
            {options[value]}
          </StyledValue>
        </Row>
        <IconChevronDown className="chevron" />
      </OpenListButton>
      <div className={isOpen ? "" : "hidden"} ref={ref}>
        <OptionsWrapper>
          {Object.entries(options).map(([itemKey, itemValue]) => {
            return (
              <OptionButton key={`select-popup-option-${itemKey}`} onClick={() => handleChange(itemKey)}>
                <Typography typographyType="body" weight={itemKey === value ? "700" : "400"} as="span">
                  {itemValue}
                </Typography>
                {itemKey === value && <IconCheck size={20} />}
              </OptionButton>
            );
          })}
        </OptionsWrapper>
      </div>
    </SelectWrapper>
  );
};
