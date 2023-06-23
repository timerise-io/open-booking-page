import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { useDeleteBooking } from "features/booking/hooks/useDeleteBooking";
import useConfirmation from "features/confirmation/hooks/useConfirmation";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "state/atoms/booking";

const CancelBookingButton = () => {
  const { t } = useTranslation(["booking"]);
  const deleteBooking = useDeleteBooking();
  const bookingValue = useRecoilValue(bookingAtom);

  const showConfirmation = useConfirmation({
    type: "booking/delete",
    confirmButtonType: "danger",
    onConfirm: () => {
      deleteBooking();
    },
  });

  const handleDelete = () => showConfirmation();

  if (bookingValue === undefined) return null;

  return (
    <ContextButton colorType="danger" onClick={handleDelete}>
      <Typography typographyType="body" align="center" as="span" color="inherit" weight="700">
        {t("cancel-booking")}
      </Typography>
    </ContextButton>
  );
};

export default CancelBookingButton;
