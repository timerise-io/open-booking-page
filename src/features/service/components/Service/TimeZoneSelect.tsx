import React from "react";
import Select from "components/forms/Select";
import { zonesSelectObject } from "helpers/timeZones";
import { useUiStore } from "state/stores";
import styled from "styled-components";

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
  const timeZone = useUiStore((state) => state.timeZone);
  const setTimeZone = useUiStore((state) => state.setTimeZone);
  return (
    <SelectWrapper>
      <Select
        onChange={(value) => {
          localStorage.setItem("TIMEZONE", value);
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
