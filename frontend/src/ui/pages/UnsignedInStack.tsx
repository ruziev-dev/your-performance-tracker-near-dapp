import React, { FC } from "react";
import { Box, Button, Paper } from "@mui/material";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import store from "../../store/store";
import { Logo } from "../atoms/Logo";
import { DisplayText } from "../atoms/DisplayText";
import { ActionSteps } from "../components/ActionSteps";

export const UnsignedInStack: FC = () => {
  const onClick = () => {
    store.showWalletsModal();
  };

  return (
    <>
      <Box
        className="bg-svg-picture"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
          height: "90vh",
          bgcolor: "background.default",
          pt: 5,
          pb: 5,
        }}
      >
        <Paper
          className="glass"
          sx={{
            width: 700,
            maxWidth: "100%",
            height: "100%",
            bgcolor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ActionSteps />
          </Box>
          <Button
            color="warning"
            sx={{ margin: 5 }}
            onClick={onClick}
            variant="contained"
            startIcon={<AccountBalanceWalletTwoToneIcon />}
          >
            Connect Near Wallet
          </Button>
        </Paper>
      </Box>

      <Paper
        elevation={4}
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
          color="warning"
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
