import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const AppLoader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};
