import { ConfirmationType } from "models/confirmation";
import { ButtonType } from "models/theme";
import { atom } from "recoil";

interface Confirmation {
  type: ConfirmationType;
  confirmButtonType: ButtonType;
  state: "open" | "aborted" | "confirmed";
}

const confirmationAtom = atom<Confirmation | undefined>({
  key: "confirmationAtom",
  default: undefined,
});

export default confirmationAtom;
