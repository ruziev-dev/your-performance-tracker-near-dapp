import { Alert, AlertTitle, AlertProps, AlertColor } from "@mui/material";
import React from "react";

interface AppAlertProps extends AlertProps {
  message: string;
  title: string;
  type: AlertColor;
}

export const AppAlert: React.FC<AppAlertProps> = ({
  onClose = () => {},
  message,
  title,
  type,
}) => {
  return (
    <Alert severity={type} onClose={onClose}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};
