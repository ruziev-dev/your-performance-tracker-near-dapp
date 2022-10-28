import React, { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Stack } from "@mui/material";
import { AppAlert } from "../components/AppAlert";
import { IAlert } from "../../types/frontend-types";

const ALERT_TIME = 10000;

type Props = {
  children: ReactNode;
};

type TShowAlert = ({ message, type, title }: Omit<IAlert, "key">) => void;

export const AlertContext = createContext<TShowAlert>(() => {});
export let showAlertGlobal: TShowAlert = () => {};

export const AlertProvider: React.FC<Props> = ({ children }) => {
  const [alertState, setAlertState] = useState<IAlert[]>([]);

  const showAlert = ({ message, type, title }) => {
    const newAlert: IAlert = {
      key: uuidv4(),
      message,
      type,
      title,
    };
    const newState = [...alertState, newAlert];
    setAlertState(newState);
    setTimeout(() => closeAlert(newAlert.key), ALERT_TIME);
  };

  const closeAlert = (uuid: string) => {
    const newAlertState = alertState.filter(
      (alertObj) => alertObj.key !== uuid
    );
    setAlertState(newAlertState);
  };
  showAlertGlobal = showAlert;

  const onClose = (key: string) => {
    console.log(key);
    closeAlert(key);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Stack
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          gap: 1,
        }}
      >
        {alertState.map((alert) => (
          <AppAlert {...alert} uuid={alert.key} onClose={onClose} />
        ))}
      </Stack>
    </AlertContext.Provider>
  );
};
