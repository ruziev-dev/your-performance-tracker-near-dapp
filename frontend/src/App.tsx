import "regenerator-runtime/runtime";

import React, { useEffect, useState } from "react";
import { SignedInStack } from "./ui/pages/SignedInStack";
import { UnsignedInStack } from "./ui/pages/UnsignedInStack";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./ui/theme/theme";
import { observer } from "mobx-react-lite"
import store from "./store/store";


const App = observer(() => {
  useEffect(() => {
    store.initApp();
  }, []);

  return (
    <ThemeProvider theme={store.isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {store.isSignedIn ? <SignedInStack /> : <UnsignedInStack />}
    </ThemeProvider>
  );
})
export default <App />;
