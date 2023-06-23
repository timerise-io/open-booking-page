import React, { useCallback, useRef, useState } from "react";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import styled, { css } from "styled-components";
import { IconCheck, IconChevronDown } from "@tabler/icons";

const SelectWrapper = styled(Column)`
  position: relative;
  width: 100%;

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
  height: 36px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  ${({ theme, disabled }) => {
    const borderColor = theme.colorSchemas.input.border;
    const backgroundColor = disabled ? "#F6F6F6" : theme.colorSchemas.input.background;

    return css`
      background-color: ${backgroundColor};
      border-color: ${borderColor};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});
    `;
  }}

  ${({ theme, disabled }) => {
    const fontColor = disabled ? "#999999" : theme.colors.primary;

    if (disabled)
      return css`
        .disabled-text {
          color: ${fontColor};
        }
      `;

    const borderHoverColor = theme.colorSchemas.input.borderHover;
    const borderFocusColor = theme.colors.primary;

    return css`
      &:hover {
        border-color: ${borderHoverColor};
      }

      &:focus {
        border-color: ${borderFocusColor};
      }
    `;
  }}

  .chevron {
    width: 15px;
    height: 15px;
    margin: auto 0 auto 24px;
  }
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
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow: auto;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.input.background};
    `;
  }}
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

  ${({ theme }) => {
    return css`
      &:hover {
        cursor: pointer;
        background: ${theme.colorSchemas.background.secondary.color};
      }
    `;
  }}

  & > span {
    margin: 0;
    white-space: nowrap;
  }
`;

const showTick = (key: string, value: string | Array<string>) => {
  if (typeof value === "string") {
    return value === key;
  }

  const index = value.indexOf(key);

  return index > -1;
};

const getMultiValue = (value: Array<string>, options: Record<string, string>) => {
  const texts = value.map((item) => {
    return options[item] ?? "";
  });

  if (texts.length < 4) {
    return texts.join(", ");
  }

  return `${texts.slice(0, 3).join(", ")} +${texts.length - 3}`;
};

type ContextSelectProps = {
  className?: string;
  label: string;
  value: string | Array<string>;
  options: Record<string, string>;
  onChange?: (value: string | Array<string>) => void;
  disabled?: boolean;
  fixedDisplay?: string;
  closeAfterChange?: boolean;
};

export const ContextSelect: React.FC<ContextSelectProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  fixedDisplay,
  className,
  closeAfterChange = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback((event: Event) => {
    setIsOpen(false);
  }, []);

  useOnClickOutside(ref, memoizedCallback);

  const handleChange = (newSelectedKey: string) => {
    if (typeof value === "string") {
      setIsOpen(false);
      onChange && onChange(newSelectedKey);
      closeAfterChange && setIsOpen(false);
      return;
    }
    //multiselect below
    const index = value.indexOf(newSelectedKey);
    if (index > -1) {
      const newValues = [...value];
      newValues.splice(index, 1);
      onChange && onChange([...newValues]);
    } else {
      onChange && onChange([...value, newSelectedKey]);
    }
    closeAfterChange && setIsOpen(false);
  };

  const selectedValue = typeof value === "string" ? options[value] : getMultiValue(value, options);

  return (
    <SelectWrapper ai="flex-start" ref={ref} className={className}>
      {label !== "" && <StyledLabel>{label}</StyledLabel>}
      <OpenListButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type="button"
        disabled={disabled}
      >
        <Row className="label-value" jc="flex-start">
          <StyledValue className="disabled-text" typographyType="body">
            {fixedDisplay || selectedValue}
          </StyledValue>
        </Row>
        <IconChevronDown className="chevron" />
      </OpenListButton>
      <div className={isOpen ? "" : "hidden"}>
        <OptionsWrapper>
          {Object.entries(options).map(([itemKey, itemValue]) => {
            const isMarked = showTick(itemKey, value);

            return (
              <OptionButton key={`select-popup-option-${itemKey}`} onClick={() => handleChange(itemKey)} type="button">
                <Typography typographyType="body" weight={isMarked ? "700" : "400"} as="span">
                  {itemValue}
                </Typography>
                {isMarked && <IconCheck size={20} />}
              </OptionButton>
            );
          })}
        </OptionsWrapper>
      </div>
    </SelectWrapper>
  );
};
