import React, { FC } from "react";
import { Button } from "@mui/material";
import store from "../../store/store";

export const UnsignedInStack: FC= () => {
  return (
    <>
      <Button onClick={() => store.login()} variant="contained">Connect Near Wallet</Button>
    </>
  );
};
