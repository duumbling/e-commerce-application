import React from "react";
import { TextField, FormLabel, type TextFieldProps } from "@mui/material";

import {
  helperTextStyle,
  inputStyle,
  insideLabelStyle,
  outsideLabelStyle,
} from "./style";

type CustomTextFieldProps = Omit<TextFieldProps, "variant" | "size"> & {
  labelPosition?: "outside" | "inside";
};

export const CustomTextField = (props: CustomTextFieldProps) => {
  const isLabelOutside = props.labelPosition === "outside";
  return (
    <React.Fragment>
      {isLabelOutside ? (
        <FormLabel sx={outsideLabelStyle}>{props.label}</FormLabel>
      ) : null}
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
        label={isLabelOutside ? "" : props.label}
      />
    </React.Fragment>
  );
};
