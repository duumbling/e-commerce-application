import { type TypographyProps, type ButtonProps } from "@mui/material";
import { ThemeColors } from "../../../constants/colors";

export const cardActionAreaStyleProps: ButtonProps = {
  color: "success",
  sx: {
    position: "relative",
    p: 0,
  },
};

export const textStyleProps: TypographyProps = {
  p: "2rem 3rem",
  fontWeight: "bold",
  fontSize: "3rem",
  sx: (theme) => ({
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.short,
    }),

    ":not(:hover)": {
      color: ThemeColors.GREY_LIGHT,
      "& .MuiSvgIcon-root": {
        color: "transparent",
      },
    },
    "& .MuiSvgIcon-root": {
      position: "absolute",
      transition: "inherit",
      fontSize: "2rem",
      top: "0.5rem",
      right: "0.5rem",
    },
  }),
};
