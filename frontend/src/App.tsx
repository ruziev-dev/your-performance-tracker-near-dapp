import "regenerator-runtime/runtime";
import "../assets/global.css";

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { SignedInStack } from "./ui/pages/SignedInStack";
import { UnsignedInStack } from "./ui/pages/UnsignedInStack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./ui/theme/theme";
import { observer } from "mobx-react-lite";
import store from "./store/store";
import { AlertProvider } from "./ui/views/AlertProvider";
import { AppModal } from "./ui/components/Modal/AppModal";

const App = observer(() => {
  useEffect(() => {
    store.initApp();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={store.isDarkTheme ? darkTheme : lightTheme}>
        <AlertProvider>
          <CssBaseline />
          {store.isSignedIn ? <SignedInStack /> : <UnsignedInStack />}
          <AppModal />
        </AlertProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
});
export default <App />;
