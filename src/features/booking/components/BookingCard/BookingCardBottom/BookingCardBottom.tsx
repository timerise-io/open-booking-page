import { Row } from "components/layout/Row";
import { useRecoilValue } from "recoil";
import { bookingCardViewConfig } from "state/selectors/bookingCardViewConfig";
import styled from "styled-components";
import BackToServiceButton from "./BackToServiceButton";
import CancelBookingButton from "./CancelBookingButton";
import { RescheduleBookingButton } from "./RescheduleBookingButton";

const Wrapper = styled(Row)`
  border-top: 1px solid ${({ theme }) => theme.colorSchemas.separator};
  padding-top: 20px;
`;

const StyledDualButtonWrapper = styled.div`
  gap: 8px;
  display: flex;
`

const BookingCardBottom = () => {
  const cardConfig = useRecoilValue(bookingCardViewConfig);
console.log(cardConfig)
  const { cancel: showCancelButton, service: showBackToServiceButton } = {
    ...cardConfig?.actions,
  };

  if (!showBackToServiceButton && !showCancelButton) return null;

  return (
    <Wrapper
      jc={ "space-between" }
    >
      {!!showBackToServiceButton && <BackToServiceButton />}
      <StyledDualButtonWrapper>
        <RescheduleBookingButton />
        <CancelBookingButton />
        {/* {!!showCancelButton && <CancelBookingButton />} */}
      </StyledDualButtonWrapper>
    </Wrapper>
  );
};

export default BookingCardBottom;
