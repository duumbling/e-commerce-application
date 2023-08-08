import React from "react";
import { Button, type ButtonProps } from "@mui/material";

import { style } from "./style";

type CustomButtonProps = Pick<
  ButtonProps,
  "variant" | "children" | "onClick" | "sx"
>;

export const CustomButton = ({
  variant = "contained",
  children,
  sx,
  onClick,
}: CustomButtonProps): JSX.Element => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{ ...style[variant], ...sx }}
    >
      {children}
    </Button>
  );
};
