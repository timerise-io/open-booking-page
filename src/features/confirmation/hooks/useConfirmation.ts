import { useEffect, useState } from "react";
import { ConfirmationType } from "models/confirmation";
import { ButtonType } from "models/theme";
import { useRecoilState, useResetRecoilState } from "recoil";
import confirmationAtom from "state/atoms/confirmation";

interface UseContextProps {
  onAbort?: Function;
  confirmButtonType: ButtonType;
  onConfirm?: Function;
  type: ConfirmationType;
}

const useConfirmation = ({ onAbort, confirmButtonType, onConfirm, type }: UseContextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useRecoilState(confirmationAtom);
  const resetConfirmation = useResetRecoilState(confirmationAtom);

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
      resetConfirmation();
      onAbort && onAbort();
    } else if (isOpen && confirmation?.state === "confirmed") {
      setIsOpen(false);
      resetConfirmation();
      onConfirm && onConfirm();
    }
  }, [confirmation, isOpen, onAbort, onConfirm, resetConfirmation]);

  const handleOpen = () => setIsOpen(true);

  return handleOpen;
};

export default useConfirmation;
