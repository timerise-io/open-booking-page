import { Button } from "components/Button";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { useField } from "formik";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import styled from "styled-components";

const StyledColumn = styled(Column)`
  position: relative;
`;

const StyledHint = styled(Typography)`
  position: absolute;
  top: 25px;
  right: 8px;
`;

const StyledButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
`;

interface GuestsListFieldProps {
  label?: string;
  name: string;
  minGuests?: number | null;
  maxGuests?: number | null;
}

const GuestsList: React.FC<GuestsListFieldProps> = ({
  name,
  label,
  minGuests = 1,
  maxGuests = 10,
}) => {
  const selectedSlot = useRecoilValue(selectedSlotSelector);
  const { t } = useTranslation(["forms"]);

  const guestsLimit: number = maxGuests ? (maxGuests - 1) : 0;

  const guest: {fullName: string, emailAddress: string} = { fullName: "",  emailAddress: "" };
  const [guests, setGuests] = useState([guest]);

  const [, meta, helpers] = useField({ name });
  const { setTouched, setValue } = helpers;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = event.target.getAttribute('data-index');
    const field = event.target.getAttribute('data-field');
    const newValue = event.target.value;
    let tmpGuests: any[] = guests;
    if(index && field) {
      tmpGuests[parseInt(index)][field] = newValue;
      setGuests(tmpGuests);
      setValue(tmpGuests);
    }
  }

  const handleClick = () => {
    let tmpGuests: any[] = guests;
    tmpGuests.push(guest);
    setGuests(tmpGuests);
    setValue(tmpGuests);
  }

  return (
    <StyledColumn ai="stretch">
      <Box mb={2.5}>
        <Typography typographyType="h3" as="h3" displayType="contents">
          {label}
        </Typography>
      </Box>
      <input id={name} type="hidden"></input>
      {guests.map((guest, index) => (
      <Row ai="stretch" key={"guest" + index} gap="10px">
        <StyledColumn ai="stretch" style={{ width: "100%", marginBottom: "10px" }}>
          <StyledLabel htmlFor={name}>Full name</StyledLabel>
          <StyledInput
            data-index={index}
            data-field="fullName"
            id={name + 'FullName' + index}
            defaultValue={guest.fullName}
            onBlur={() => {
              setTouched(true);
            }}
            onChange={handleChange}
          />
        </StyledColumn>
        <StyledColumn ai="stretch" style={{ width: "100%", marginBottom: "10px" }}>
          <StyledLabel htmlFor={name}>E-mail</StyledLabel>
          <StyledInput
            data-index={index}
            data-field="emailAddress"
            id={name + "EmailAddress" + index}
            defaultValue={guest.emailAddress}
            onBlur={() => {
              setTouched(true);
            }}
            onChange={handleChange}
          />
        </StyledColumn>
      </Row>
      ))}

      {guests.length < guestsLimit && (
      <StyledButtonsWrapper mt={1} mb={1}>
        <Button 
          style={{ boxShadow: 'none', padding: 0, fontWeight: 400, width: 'auto' }} 
          type="button" 
          buttonType="text" 
          data-cy="add-guest-button" 
          onClick={handleClick}>
            + Add more guests
        </Button>
      </StyledButtonsWrapper>
      )}

      {selectedSlot !== undefined && (
        <StyledHint typographyType="body" as="span">{t("outOf", { maxGuests })}</StyledHint>
      )}

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

export default GuestsList;
