import React from "react";
import { Button, type ButtonProps } from "@mui/material";

import { style } from "./style";

export function CustomButton({
  variant = "contained",
  sx,
  ...otherProps
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      sx={{ ...style[variant], ...sx }}
      {...otherProps}
    ></Button>
  );
}
