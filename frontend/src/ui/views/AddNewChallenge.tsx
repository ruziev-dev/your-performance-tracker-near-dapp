import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

export const AddNewChallenge = observer(() => {
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 500,
      }}
    >
      AddNewChallenge
    </Box>
  );
});
