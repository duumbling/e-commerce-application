import type { SxProps, Theme } from "@mui/material";
import { style as customButtonStyle } from "../../CustomButton/style";
import { resolveSx } from "../../../lib/helpers/styles";

export const favoriteButtonStyle: SxProps<Theme> = resolveSx(
  customButtonStyle.contained,
  {
    p: ".25rem",
    fontSize: "2.5rem",
  },
);

export const favoriteIconStyle: SxProps<Theme> = {
  fontSize: "inherit",
};
