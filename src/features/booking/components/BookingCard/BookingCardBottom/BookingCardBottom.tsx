import { Row } from "components/layout/Row";
import { useRecoilValue } from "recoil";
import { bookingCardViewConfig } from "state/selectors/bookingCardViewConfig";
import styled, { css } from "styled-components";
import BackToServiceButton from "./BackToServiceButton";
import CancelBookingButton from "./CancelBookingButton";
import { RescheduleBookingButton } from "./RescheduleBookingButton";

const Wrapper = styled(Row)`
  border-top: 1px solid ${({ theme }) => theme.colorSchemas.separator};
  padding-top: 20px;
`;

const StyledDualButtonWrapper = styled.div<{showRescheduleButton?: boolean, showCancelButton?: boolean,}>`
  gap: 8px;
  ${({ showRescheduleButton, showCancelButton }) => {
    return css`
      display: ${!!showRescheduleButton || !!showCancelButton ? "flex" : "none"};
    `;
  }}
`;

const BookingCardBottom = () => {
  const cardConfig = useRecoilValue(bookingCardViewConfig);

  const { cancel: showCancelButton, service: showBackToServiceButton, reschedule: showRescheduleButton } = {
    ...cardConfig?.actions,
  };

  if (!showBackToServiceButton && !showCancelButton && !showRescheduleButton) return null;

  return (
    <Wrapper
      jc={
        !!showBackToServiceButton && (!!showCancelButton || !!showRescheduleButton)
          ? "space-between"
          : "space-around"
      }
    >
      {!!showBackToServiceButton && <BackToServiceButton />}
      <StyledDualButtonWrapper
        showRescheduleButton={showRescheduleButton}
        showCancelButton={showCancelButton}
      >
        {!!showRescheduleButton && <RescheduleBookingButton />}
        {!!showCancelButton && <CancelBookingButton />}
      </StyledDualButtonWrapper>
    </Wrapper>
  );
};

export default BookingCardBottom;
