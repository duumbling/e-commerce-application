import React from "react";
import { Button, type ButtonProps } from "@mui/material";

import { style } from "./style";

type Props = Pick<ButtonProps, "variant" | "children" | "onClick" | "sx">;

export const CustomButton = ({
  variant,
  children,
  sx,
  onClick,
}: Props): JSX.Element => {
  const currentVariant = variant ?? "contained";

  return (
    <Button
      variant={currentVariant}
      onClick={onClick}
      sx={{ ...style[currentVariant], ...sx }}
    >
      {children}
    </Button>
  );
};
