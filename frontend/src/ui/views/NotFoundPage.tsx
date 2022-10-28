import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/page-not-found.json"

export const NotFoundPage = observer(() => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box
      sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </Box>
  );
});
