import "regenerator-runtime/runtime";

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { SignedInStack } from "./ui/pages/SignedInStack";
import { UnsignedInStack } from "./ui/pages/UnsignedInStack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./ui/theme/theme";
import { observer } from "mobx-react-lite";
import store from "./store/store";
import { AlertContainer } from "./ui/views/AlertContainer";

const App = observer(() => {
  useEffect(() => {
    store.initApp();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={store.isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        {store.isSignedIn ? <SignedInStack /> : <UnsignedInStack />}
        <AlertContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
});
export default <App />;
