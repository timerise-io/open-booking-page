import { useState } from "react";
import { ReactTagManager } from "react-gtm-ts";
import { GoogleTagManagerEvent, UseGTM } from "../types";

export const useGoogleTagManager: UseGTM = () => {
  const [GTMId, setGTMId] = useState<string>("");

  const init = (id: string) => {
    if (!id) return;
    ReactTagManager.init({
      code: id,
      debug: false,
      performance: false,
    });
    setGTMId(id);
  };

  const action = (event: GoogleTagManagerEvent) => {
    if (!GTMId) return;

    ReactTagManager.action(event);
  };

  return {
    init,
    action,
  };
};
