import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { UserWallet } from "../../near/wallet";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { utils } from "near-api-js";
import { BalanceCard } from "../atoms/BalanceCard";
import { toNear } from "../../utils/helpers";

export const Header = observer(() => {
  const { palette } = useTheme();

  const nearDiff =
    parseFloat(toNear(store.userState?.total_hold || "0")) -
    parseFloat(toNear(store.userState?.free_hold || "0"));

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid item xs={4} md={1}>
        <BalanceCard
          title={"Total hold"}
          nearValue={toNear(store.userState?.total_hold || "0")}
          unit="Ⓝ"
          Icon={WalletIcon}
          sx={{ backgroundColor: palette.secondary.main }}
        />
      </Grid>
      <Grid item xs={4} md={1}>
        <BalanceCard
          title={"Free hold"}
          nearValue={toNear(store.userState?.free_hold || "0")}
          unit="Ⓝ"
          Icon={WalletIcon}
          sx={{ backgroundColor: palette.success.main }}
        />
      </Grid>

      <Grid item xs={4} md={1}>
        <BalanceCard
          title={"Frozen hold"}
          nearValue={nearDiff}
          unit="Ⓝ"
          Icon={WalletIcon}
          sx={{ backgroundColor: palette.primary.main }}
        />
      </Grid>

      <Grid item xs={4} md={2}>
        <Button
          onClick={() => store.logout()}
          startIcon={<PersonIcon />}
          color="info"
        >
          {store.accountId}
        </Button>
      </Grid>
    </Grid>
  );
});
