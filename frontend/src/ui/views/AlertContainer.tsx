import React from "react";
import { Stack } from "@mui/material";
import { AppAlert } from "../components/AppAlert";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { autorun } from "mobx";

export const AlertContainer: React.FC = observer(() => {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
        gap: 1,
      }}
    >
      {store.alertState.map((alert) => (
        <AppAlert {...alert} />
      ))}
    </Stack>
  );
})
