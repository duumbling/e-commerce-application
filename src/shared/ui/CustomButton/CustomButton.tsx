import React from "react";
import { Button, type ButtonProps } from "@mui/material";

import { style } from "./style";

export type CustomButtonProps = ButtonProps;

export function CustomButton({
  variant = "contained",
  sx,
  ...otherProps
}: CustomButtonProps) {
  return (
    <Button
      variant={variant}
      sx={{ ...style[variant], ...sx }}
      {...otherProps}
    />
  );
}
