import React from "react";
import { Typography } from "components/Typography";
import TimezoneInfo from "features/service/components/Service/TimezoneInfo";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colorSchemas.separator};
  padding-bottom: 8px;
`;

const ShortId: React.FC<{ shortId: string }> = ({ shortId }) => {
  return (
    <Wrapper>
      <Typography typographyType="body" as="span">
        ID: <strong>{shortId}</strong>
      </Typography>

      <TimezoneInfo />
    </Wrapper>
  );
};

export default ShortId;
