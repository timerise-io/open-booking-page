import Select from "components/forms/Select";
import React from "react";
import { useRecoilState } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";
import styled from "styled-components";
import { zonesSelectObject } from "helpers/timeZones";

const SelectWrapper = styled.div`
  & > div > select {
    max-width: 240px;
  }

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    & > div > select {
      max-width: 200px;
    }
  }
`;

const TimeZoneSelect = () => {
  const [timeZone, setTimeZone] = useRecoilState(timeZoneAtom);
  return (
    <SelectWrapper>
      <Select
        onChange={(value) => {
          setTimeZone(value);
        }}
        defaultValue={timeZone}
      >
        {zonesSelectObject.map((zone) => (
          <option key={zone.text} value={zone.value}>
            {zone.text}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default TimeZoneSelect;
