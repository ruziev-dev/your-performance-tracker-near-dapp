import { Alert, AlertTitle, AlertProps, AlertColor } from "@mui/material";
import React from "react";

interface AppAlertProps {
  message: string;
  title: string;
  type: AlertColor;
  uuid: string;
  onClose: (uuid: string) => void;
}

export const AppAlert: React.FC<AppAlertProps> = ({
  onClose,
  message,
  title,
  type,
  uuid,
}) => {
  const onClickClose = () => onClose(uuid);
  return (
    <Alert severity={type} onClose={onClickClose}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};
