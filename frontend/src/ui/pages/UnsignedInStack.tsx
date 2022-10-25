import React, { FC, useState } from "react";
import { Button, Paper } from "@mui/material";
import store from "../../store/store";

export const UnsignedInStack: FC = () => {
  const [isModalShown, setModal] = useState(false);

  const onClick = () => {
    if (isModalShown) store.hideWalletsModal();
    else store.showWalletsModal();

    setModal(!isModalShown);
  };

  return (
    /* <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    > */
    <div>
      <Button onClick={onClick} variant="contained">
        Connect Near Wallet
      </Button>
    </div>
    /* </Box> */
  );
};
