import React from "react";
import { Button, type ButtonProps } from "@mui/material";

import { style } from "./style";

type Props = Pick<ButtonProps, "variant" | "children" | "onClick" | "sx">;

export const CustomButton = ({
  variant = "contained",
  children,
  sx,
  onClick,
}: Props): JSX.Element => {
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
