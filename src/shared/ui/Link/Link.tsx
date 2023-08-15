import React from "react";
import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Paths } from "../../constants/paths";
import { ThemeColors } from "../../constants/colors";
import type { Omit } from "@reduxjs/toolkit/dist/tsHelpers";

type LinkProps = Omit<MuiLinkProps, "color"> & {
  href: Paths;
  color?: ThemeColors;
};

export function Link({
  href,
  color = ThemeColors.BLACK,
  underline = "none",
  sx,
  ...otherProps
}: LinkProps) {
  const hoverColor =
    color === ThemeColors.PRIMARY ? ThemeColors.BLACK : "primary.main";

  return (
    <MuiLink
      component={RouterLink}
      to={href}
      color={color}
      underline={underline}
      sx={{
        "&:hover": {
          color: hoverColor,
        },
        ...sx,
      }}
      {...otherProps}
    />
  );
}
