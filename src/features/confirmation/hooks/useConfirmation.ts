import { useEffect, useState } from "react";
import { ConfirmationType } from "models/confirmation";
import { ButtonType } from "models/theme";
import { useBookingStore } from "state/stores";

interface UseContextProps {
  onAbort?: Function;
  confirmButtonType: ButtonType;
  onConfirm?: Function;
  type: ConfirmationType;
}

const useConfirmation = ({ onAbort, confirmButtonType, onConfirm, type }: UseContextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const confirmation = useBookingStore((state) => state.confirmation);
  const setConfirmation = useBookingStore((state) => state.setConfirmation);

  useEffect(() => {
    if (isOpen) {
      setConfirmation({
        state: "open",
        type,
        confirmButtonType,
      });
    }
  }, [isOpen, type, confirmButtonType, setConfirmation]);

  useEffect(() => {
    if (isOpen && confirmation?.state === "aborted") {
      setIsOpen(false);
      setConfirmation(undefined);
      onAbort && onAbort();
    } else if (isOpen && confirmation?.state === "confirmed") {
      setIsOpen(false);
      setConfirmation(undefined);
      onConfirm && onConfirm();
    }
  }, [confirmation, isOpen, onAbort, onConfirm, setConfirmation]);

  const handleOpen = () => setIsOpen(true);

  return handleOpen;
};

export default useConfirmation;
