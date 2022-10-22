import { Box, Grid, Paper } from "@mui/material";
import React, { FC } from "react";
import { SideMenu } from "../components/SideMenu";
import { Header } from "../components/Header";
import { Stack } from "@mui/system";
import store from "../../store/store";


export const SignedInStack: FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
      <Grid container sx={{ maxWidth: "xl" }} spacing={2}>
        <Grid item xs={12} md={3}>
          <SideMenu />
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Header/>
            <Paper sx={{ borderRadius: 5, height: 200 }}></Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
