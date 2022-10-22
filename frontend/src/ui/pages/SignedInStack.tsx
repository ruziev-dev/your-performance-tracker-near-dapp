import { Box, Grid, Paper } from "@mui/material";
import React, { FC } from "react";
import { SideMenu } from "../components/SideMenu";
import { Header } from "../components/Header";
import { Stack } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { VIEWS } from "../views/navigation";
import { Challenges } from "../views/Challenges";
import { AddNewChallenge } from "../views/AddNewChallenge";
import { Deposit } from "../views/Deposit";
import { Withdraw } from "../views/Withdraw";
import { NotFoundPage } from "../views/NotFoundPage";

export const SignedInStack: FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
      <Grid container sx={{ maxWidth: "xl" }} spacing={2}>
        <Grid item xs={12} md={3}>
          <SideMenu />
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Header />
            <Paper sx={{ borderRadius: 5, height: "100%" }}>
              <Routes>
                <Route index element={<Challenges />} />
                <Route
                  path={VIEWS.ADD_CHALLENGE}
                  element={<AddNewChallenge />}
                />
                <Route path={VIEWS.DEPOSIT} element={<Deposit />} />
                <Route path={VIEWS.WITHDRAW} element={<Withdraw />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
