import React from "react";
import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Omit } from "@reduxjs/toolkit/dist/tsHelpers";
import type { Paths } from "../../constants/paths";

type LinkProps = Omit<MuiLinkProps, "href"> & {
  href: Paths | string;
};

export function Link({ href, color = "secondary", ...otherProps }: LinkProps) {
  return (
    <MuiLink
      component={RouterLink}
      to={href}
      color={color}
      {...otherProps}
    ></MuiLink>
  );
}
