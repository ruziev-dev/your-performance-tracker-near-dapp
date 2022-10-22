import React from "react";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { Grid, useTheme } from "@mui/material";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import KeyboardDoubleArrowUpTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import { BalanceCard } from "../atoms/BalanceCard";
import { toNear } from "../../utils/helpers";
import { ActionButton } from "../atoms/ActionButton";
import { useNavigation } from "../views/navigation";
import AccountMenu from "../atoms/AccountMenu";

export const Header = observer(() => {
  const { palette } = useTheme();
  const navigate = useNavigation();

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
          Icon={SavingsTwoToneIcon}
          sx={{ backgroundColor: palette.secondary.main }}
          ActionElement={() => (
            <ActionButton
              title="Deposit"
              startIcon={<KeyboardDoubleArrowUpTwoToneIcon />}
              onClick={navigate.goDepositView}
            />
          )}
        />
      </Grid>
      <Grid item xs={4} md={1}>
        <BalanceCard
          title={"Free hold"}
          nearValue={toNear(store.userState?.free_hold || "0")}
          unit="Ⓝ"
          Icon={AccountBalanceWalletTwoToneIcon}
          sx={{ backgroundColor: palette.primary.main }}
          ActionElement={() =>
            !!parseFloat(toNear(store.userState?.free_hold || "0")) ? (
              <ActionButton
                title="Use"
                endIcon={<EmojiEventsTwoToneIcon />}
                onClick={navigate.goAddChallengeView}
              />
            ) : null
          }
        />
      </Grid>

      <Grid item xs={4} md={1}>
        <BalanceCard
          title={"Frozen hold"}
          nearValue={nearDiff}
          unit="Ⓝ"
          Icon={AccountBalanceTwoToneIcon}
          sx={{ backgroundColor: palette.success.main }}
        />
      </Grid>

      <Grid item xs={4} md={2}>
        <AccountMenu />
      </Grid>
    </Grid>
  );
});
