import * as React from "react";
import { Button } from "@mui/material";
import store from "../../store/store";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";


export default function AccountMenu() {
  return (
    <Button
      onClick={() => store.logout()}
      startIcon={<AccountCircleTwoToneIcon />}
      color="info"
    >
      {store.accountId}
    </Button>
  );
}
