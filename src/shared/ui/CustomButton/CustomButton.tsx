import React from "react";
import { Button, type ButtonProps } from "@mui/material";

import { style } from "./style";

type CustomButtonProps = Pick<
  ButtonProps,
  "variant" | "children" | "onClick" | "sx" | "type" | "form"
>;

export const CustomButton = ({
  variant = "contained",
  children,
  sx,
  type,
  form,
  onClick,
}: CustomButtonProps): JSX.Element => {
  return (
    <Button
      variant={variant}
      type={type}
      form={form}
      onClick={onClick}
      sx={{ ...style[variant], ...sx }}
    >
      {children}
    </Button>
  );
};
