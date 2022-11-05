import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#011E3C",
      paper: "#212B45",
    },
    primary: {
      main: "#1EA51D",
    },
    secondary: {
      main: "#A51DA5",
    },
    success: {
      main: "#0D6CE8",
    },
    warning: {
      main: "#FFCD05",
    },
    error: {
      main: "#D62237",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F9F9F9",
      paper: "#D4D5D8",
    },
    primary: {
      main: "#1EA51D",
    },
    secondary: {
      main: "#A51DA5",
    },
    success: {
      main: "#0D6CE8",
    },
    warning: {
      main: "#FFCD05",
    },
    error: {
      main: "#D62237",
    },
  },
});
