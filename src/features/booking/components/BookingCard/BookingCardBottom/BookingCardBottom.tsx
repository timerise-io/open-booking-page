import { Row } from "components/layout/Row";
import { useRecoilValue } from "recoil";
import { bookingCardViewConfig } from "state/selectors/bookingCardViewConfig";
import styled from "styled-components";
import BackToServiceButton from "./BackToServiceButton";
import CancelBookingButton from "./CancelBookingButton";

const Wrapper = styled(Row)`
  border-top: 1px solid ${({ theme }) => theme.colorSchemas.separator};
  padding-top: 20px;
`;

const BookingCardBottom = () => {
  const cardConfig = useRecoilValue(bookingCardViewConfig);

  const { cancel: showCancelButton, service: showBackToServiceButton } = {
    ...cardConfig?.actions,
  };

  if (!showBackToServiceButton && !showCancelButton) return null;

  return (
    <Wrapper
      jc={
        !!showBackToServiceButton && !!showCancelButton
          ? "space-between"
          : "space-around"
      }
    >
      {!!showBackToServiceButton && <BackToServiceButton />}
      {!!showCancelButton && <CancelBookingButton />}
    </Wrapper>
  );
};

export default BookingCardBottom;
