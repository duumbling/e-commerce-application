import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";

import { helperTextStyle, inputStyle, insideLabelStyle } from "./style";

type CustomTextFieldProps = Omit<TextFieldProps, "variant" | "size">;

export const CustomTextField = (props: CustomTextFieldProps) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      size="small"
      InputProps={{
        ...props.InputProps,
        sx: { ...inputStyle, ...props.InputProps?.sx },
      }}
      InputLabelProps={{
        ...props.InputLabelProps,
        sx: { ...insideLabelStyle, ...props.InputLabelProps?.sx },
      }}
      FormHelperTextProps={{
        ...props.FormHelperTextProps,
        sx: { ...helperTextStyle, ...props.FormHelperTextProps?.sx },
      }}
      sx={{ ...props.sx }}
      label={props.label}
    />
  );
};
