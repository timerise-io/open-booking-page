import React, { useCallback, useEffect, useState } from "react";
import StyledInput from "components/StyledInput";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconSearch, IconX } from "@tabler/icons";

const StyledRow = styled(Row)`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
  z-index: 1;
`;
const StyledSearchInput = styled(StyledInput)`
  width: 100%;
  margin: 8px 4px 4px 4px;
`;

const StyledIconSearch = styled(IconSearch)`
  position: absolute;
  top: 18px;
  right: 12px;
`;

const ClearButton = styled.button`
  all: unset;
  position: absolute;
  top: 8px;
  right: 2px;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`;

interface Props {
  options: [string, string][];
  setFilteredOptions: Function;
  isOpen?: boolean;
}

export const SearchSelect: React.FC<Props> = ({ options, setFilteredOptions, isOpen }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredOptions = options.filter(
      ([key, label]) =>
        label.toLowerCase().includes(value.toLowerCase()) ||
        key.toLowerCase().includes(value.toLowerCase()) ||
        `+${label}`.includes(value),
    );

    setValue(value);
    setFilteredOptions(filteredOptions);
  };

  const searchInputRef = useCallback(
    (searchInputElement: HTMLInputElement) => {
      if (searchInputElement) {
        searchInputElement.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen],
  );

  useEffect(() => {
    return () => {
      setValue("");
      setFilteredOptions(options);
    };
  }, [isOpen, options, setFilteredOptions]);

  return (
    <StyledRow ai="center" jc="center">
      <StyledSearchInput
        placeholder={t("common:search-placeholder")}
        onChange={handleChange}
        value={value}
        ref={searchInputRef}
        autoFocus
      />
      {value !== "" ? (
        <ClearButton
          onClick={() => {
            setValue("");
            setFilteredOptions(options);
          }}
        >
          <IconX size={16} />
        </ClearButton>
      ) : (
        <StyledIconSearch size={16} />
      )}
    </StyledRow>
  );
};
