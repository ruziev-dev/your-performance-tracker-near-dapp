import { Typography, TypographyTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import React, { FC } from "react";

type LogoProps = {};
type Props = DefaultComponentProps<TypographyTypeMap<LogoProps>>;

export const Logo: FC<Props> = ({ sx, ...props }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 900,
          fontFamily: "'Rubik', sans-serif",
          fontStyle: "italic",
          textTransform: "uppercase",
          textAlign: "left",
          ...sx,
        }}
        {...props}
      >
        Performance Helper
      </Typography>
    </Box>
  );
};
