import { Button, ButtonTypeMap } from "@mui/material";
import React, { FC } from "react";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface BalanceCardProps {
  title: string;
}

type Props = DefaultComponentProps<ButtonTypeMap<BalanceCardProps>>;

export const ActionButton: FC<Props> = ({ title, sx, ...props }) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="warning"
      sx={{ borderRadius: 2, ...sx }}
      {...props}
    >
      {title}
    </Button>
  );
};
