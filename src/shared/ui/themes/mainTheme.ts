import { createTheme } from "@mui/material";
import { ERROR_COLOR, PRIMARY_COLOR } from "../../constants/colors";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    error: {
      main: ERROR_COLOR,
    },
  },
});
