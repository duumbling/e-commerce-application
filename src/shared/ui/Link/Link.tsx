import React from "react";
import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ThemeColors } from "../../constants/colors";

export type LinkProps = MuiLinkProps;

export function Link({
  href,
  color = ThemeColors.BLACK,
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
      underline="none"
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
