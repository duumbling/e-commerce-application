import React, { forwardRef } from "react";
import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ThemeColors } from "../../constants/colors";

export type LinkProps = MuiLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, color = ThemeColors.BLACK, sx, ...otherProps },
  ref,
) {
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
      ref={ref}
      {...otherProps}
    />
  );
});
