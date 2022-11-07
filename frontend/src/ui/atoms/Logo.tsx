import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const Logo = () => {
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
        }}
      >
        Performance Tracker
      </Typography>
    </Box>
  );
};
