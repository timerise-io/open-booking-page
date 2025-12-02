import React from "react";
import { Typography } from "components/Typography";
import TimezoneInfo from "features/service/components/Service/TimezoneInfo";
import { BOOKING_FORM_TYPES } from "models/service";
import { useBookingStore } from "state/stores";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colorSchemas.separator};
  padding-bottom: 8px;
`;

const ShortId: React.FC<{ shortId: string }> = ({ shortId }) => {
  const service = useBookingStore((state) => state.service)!;
  const showTimezone = service?.viewConfig?.displayType !== BOOKING_FORM_TYPES.PREORDER;

  return (
    <Wrapper>
      <Typography $typographyType="body" as="span">
        ID: <strong>{shortId}</strong>
      </Typography>

      <TimezoneInfo showTimezone={showTimezone} />
    </Wrapper>
  );
};

export default ShortId;
