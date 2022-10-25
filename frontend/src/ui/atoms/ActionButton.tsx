import { Button, ButtonTypeMap, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface BalanceCardProps {
  title: string;
  isLoading?: boolean;
}

type Props = DefaultComponentProps<ButtonTypeMap<BalanceCardProps>>;

export const ActionButton: FC<Props> = ({ isLoading, title, sx, ...props }) => {
  if (isLoading)
    return (
      <Button
        disabled
        variant="contained"
        color="warning"
        sx={{ borderRadius: 2, ...sx }}
      >
        <CircularProgress size={20} />
      </Button>
    );
  else
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
