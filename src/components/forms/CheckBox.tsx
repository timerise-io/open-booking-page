import React from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useField } from "formik";
import { getUrlFromString } from "helpers/functions";
import styled, { css } from "styled-components";
import { IconCheck } from "@tabler/icons";

const CheckboxInput = styled.input`
  margin: 0 6px 0 0;
  position: relative;
  width: 0;
  height: 0;
  margin-right: 22px;
  cursor: pointer;
  display: none;
  height: 18px;
`;

const CheckboxWrapper = styled(Row)`
  position: relative;

  & > label::before {
    top: -2px;
    left: -22px;
    position: absolute;
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 4px;
  }

  ${({ theme }) => {
    const colors = theme.colorSchemas.input;

    return css`
      & > label::before {
        border: 1px solid ${colors.border};
      }

      &:hover > label::before {
        border: 1px solid ${colors.borderHover};
      }

      input[type="checkbox"]:checked + label::before {
        border: 1px solid ${theme.colors.primary};
      }
    `;
  }}

  & > .icon-check {
    position: absolute;
    left: 2px;
    top: 0px;
  }
`;

const CheckboxLabel = styled(Typography)`
  position: relative;
  margin-left: 22px;
  cursor: pointer;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 0.8125rem;
`;

interface CheckBoxProps {
  name: string;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ name, label }) => {
  const [, meta, helpers] = useField({ name });
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <Column ai="flex-start">
      <CheckboxWrapper>
        <CheckboxInput
          type="radio"
          checked={value}
          onChange={() => {
            setValue(!value);
          }}
          onClick={() => {
            setValue(!value);
          }}
        />
        {value && <IconCheck className="icon-check" size={12} />}
        <CheckboxLabel
          typographyType="body"
          as="label"
          onClick={() => {
            setValue(!value);
          }}
        >
          {getUrlFromString(label)}
        </CheckboxLabel>
      </CheckboxWrapper>
      <Box h="13px" mt={0.5} mb={1}>
        {meta.error && meta.touched && (
          <Typography typographyType="label" as="span" color="error">
            {meta.error}
          </Typography>
        )}
      </Box>
    </Column>
  );
};

export default CheckBox;
