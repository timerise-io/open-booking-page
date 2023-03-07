import { Column } from "components/layout/Column";
import BaseInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import ReactCountryFlag from "react-country-flag";
import { IconChevronDown } from "@tabler/icons";
import { COUNTRY_PHONE_PREFIXES } from "helpers/constans";
import { Typography } from "components/Typography";
import { useField } from "formik";
import { Box } from "components/layout/Box";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import { defaultPhonePrefixSelector } from "state/selectors/defaultPhonePrefix";
import { useRecoilValue } from "recoil";
import { useLangParam } from "features/i18n/useLangParam";

const countryList = Object.entries(COUNTRY_PHONE_PREFIXES).sort(
  ([aKey], [bKey]) => (aKey < bKey ? -1 : 1)
);

interface PhoneSelectProps {
  label?: string;
  name?: string;
}

const openListButtonWidth = 60;

const StyledInput = styled(BaseInput)`
  padding-left: ${openListButtonWidth}px;
`;

const StyledColumn = styled(Column)`
  .hidden {
    display: none;
  }
`;

const SelectWrapper = styled(Column)`
  position: relative;
`;

const OpenListButton = styled.button`
  all: unset;
  display: flex;
  padding: 0 0 0 4px;
  position: absolute;
  height: 100%;
  width: ${openListButtonWidth}px;

  &:hover {
    cursor: pointer;
  }

  .chevron {
    width: 15px;
    height: 15px;
    margin: auto;
  }

  .flag {
    margin: auto 0 auto auto;
    width: 20px !important;
    height: unset !important;
    ${({ theme }) => css`
      filter: drop-shadow(1px 1px 0 ${theme.colorSchemas.input.border})
        drop-shadow(-1px -1px 0 ${theme.colorSchemas.input.border});
    `}
  }
`;

const ChooseCountryButton = styled(OpenListButton)`
  cursor: pointer;
  position: unset;
  padding: calc(0.75 * ${({ theme }) => theme.spacing}) 0;
  min-height: 25px;
  width: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colorSchemas.background.primary.color};
  }

  .flag {
    margin: 0 15px;
  }
`;

const ScrollWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 150px;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgb(0 0 0 / 10%);
`;

const ListWrapper = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  overflow-x: hidden;
  top: 0;
  width: 150px;
  height: 200px;
  ${({ theme }) => css`
    background-color: ${theme.colorSchemas.input.background};
    border-radius: ${theme.borderRadius};
    font-size: ${theme.typography.body.size};
    padding: calc(0.5 * ${theme.spacing}) 0;

    &:hover {
      border-color: ${theme.colorSchemas.input.borderHover};
    }

    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;

const PhoneSelect: React.FC<PhoneSelectProps> = ({
  name = "phone-number-select",
  label,
}) => {
  const paramLang = useLangParam();
  const serviceDefaultCountryCode = useRecoilValue(defaultPhonePrefixSelector);
  const defaultCountryCode =
    paramLang !== null && paramLang.split("-").length > 1
      ? paramLang.split("-")[1]
      : serviceDefaultCountryCode;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue, setTouched } = helpers;
  const { t } = useTranslation(["forms"]);
  const [countryCode, setCountryCode] = useState("PL");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback(() => setIsMenuOpen(false), []);
  useOnClickOutside(ref, memoizedCallback);

  const labelToDisplay = label === undefined ? t("phone-field") : label;

  const handleCountryCodeChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode);
    setIsMenuOpen(false);
    setValue(COUNTRY_PHONE_PREFIXES?.[newCountryCode]);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const prefix = COUNTRY_PHONE_PREFIXES?.[countryCode] ?? "";
    if (isNaN(+newValue) || isNaN(parseInt(newValue)) || newValue.length > 15)
      return;
    setValue(
      newValue.length < prefix.length
        ? prefix
        : newValue.replaceAll(/\D+/gm, "")
    );
  };

  useEffect(() => {
    setCountryCode(defaultCountryCode);
    setValue(COUNTRY_PHONE_PREFIXES?.[defaultCountryCode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCountryCode]);

  useEffect(() => {
    if (inputRef.current === null || focused === false) return;
    inputRef.current.setSelectionRange(value.length, value.length, "none");
  }, [value, focused]);

  return (
    <StyledColumn ai="stretch">
      <StyledLabel htmlFor="phone-number-select">{labelToDisplay}</StyledLabel>
      <SelectWrapper ai="stretch">
        <OpenListButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
          <IconChevronDown className="chevron" />
        </OpenListButton>
        <div className={isMenuOpen ? "" : "hidden"} ref={ref}>
          <ScrollWrapper>
            <ListWrapper />
            <ListWrapper>
              {countryList.map(([countryCode, prefix]) => (
                <ChooseCountryButton
                  key={countryCode}
                  onClick={() => handleCountryCodeChange(countryCode)}
                >
                  <ReactCountryFlag
                    className="flag"
                    svg
                    countryCode={countryCode}
                  />
                  <Typography typographyType="body" as="span">
                    {`${countryCode} ${prefix ? `+${prefix}` : ``}`}{" "}
                  </Typography>
                </ChooseCountryButton>
              ))}
            </ListWrapper>
          </ScrollWrapper>
        </div>
        <StyledInput
          value={value}
          onChange={handlePhoneNumberChange}
          onBlur={() => {
            setTouched(true);
            setFocused(false);
          }}
          ref={inputRef}
          onFocus={() => {
            setFocused(true);
          }}
        />
      </SelectWrapper>
      <Box h="13px" mt={0.5} mb={1}>
        {meta.error && meta.touched && (
          <Typography typographyType="label" as="span" color="error">
            {meta.error}
          </Typography>
        )}
      </Box>
    </StyledColumn>
  );
};

export default PhoneSelect;
