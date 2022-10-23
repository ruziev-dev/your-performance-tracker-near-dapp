import { Typography, TypographyTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import React from "react";

type Props = DefaultComponentProps<TypographyTypeMap>;

export const DisplayText: React.FC<Props> = ({ children, sx, ...props }) => {
  return (
    <Typography
      variant="button"
      fontWeight="900"
      sx={{ color: "text.disabled", ...sx }}
      {...props}
    >
      {children && typeof children === "string"
        ? children.toUpperCase()
        : children}
    </Typography>
  );
};
