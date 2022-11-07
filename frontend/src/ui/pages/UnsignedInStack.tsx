import React, { FC } from "react";
import { Box, Button, Paper } from "@mui/material";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import store from "../../store/store";
import { Logo } from "../atoms/Logo";

export const UnsignedInStack: FC = () => {
  const onClick = () => {
    store.showWalletsModal();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
          height: "90vh",
          bgcolor: "background.default",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          bgcolor: "success.main",
        }}
      ></Box>

      <Paper
        //elevation={4}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "10vh",
          width: "100vw",
          position: "fixed",
          bgcolor: "background.default",
          top: 0,
        }}
      >
        <Logo />
        <Button
          onClick={onClick}
          variant="contained"
          startIcon={<AccountBalanceWalletTwoToneIcon />}
        >
          Connect Near Wallet
        </Button>
      </Paper>
    </>
  );
};
