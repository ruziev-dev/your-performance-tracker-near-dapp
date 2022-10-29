import React, { FC } from "react";
import { Box, Button } from "@mui/material";
import store from "../../store/store";

export const UnsignedInStack: FC = () => {
  const onClick = () => {
    store.showWalletsModal();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button onClick={onClick} variant="contained">
        Connect Near Wallet
      </Button>
    </Box>
  );
};
