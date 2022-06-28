import ConfirmModal from "features/confirmation/components/ConfirmModal";
import { ConfirmationType } from "models/confirmation";
import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import confirmationAtom from "state/atoms/confirmation";
import DeleteBooking from "./ConfirmContent/DeleteBooking";

const getContent = (type: ConfirmationType) => {
  if (type === "booking/delete") return <DeleteBooking />;

  return <></>;
};

const StateModal = () => {
  const { t } = useTranslation(["confirmation"]);
  const [confirmation, setConfirmation] = useRecoilState(confirmationAtom);

  if (confirmation === undefined) return null;

  return ReactDOM.createPortal(
    <ConfirmModal
      open={true}
      title={t(`${confirmation.type}.title`)}
      onClose={() => setConfirmation({ ...confirmation, state: "aborted" })}
      onAbort={() => setConfirmation({ ...confirmation, state: "aborted" })}
      onConfirm={() => setConfirmation({ ...confirmation, state: "confirmed" })}
      confirmText={t(`${confirmation.type}.confirmText`)}
      abortText={t(`${confirmation.type}.abortText`)}
      confirmButtonType={confirmation.confirmButtonType}
    >
      {getContent(confirmation.type)}
    </ConfirmModal>,
    document.getElementById("modal")!
  );
};

export default StateModal;
