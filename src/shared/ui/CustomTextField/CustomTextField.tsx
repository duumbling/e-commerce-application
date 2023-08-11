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

export const CustomTextField = ({
  InputProps,
  InputLabelProps,
  FormHelperTextProps,
  sx,
  label,
  labelPosition,
  ...otherProps
}: CustomTextFieldProps) => {
  const isLabelOutside = labelPosition === "outside";
  return (
    <React.Fragment>
      {isLabelOutside ? (
        <FormLabel sx={outsideLabelStyle}>{label}</FormLabel>
      ) : null}
      <TextField
        {...otherProps}
        variant="outlined"
        size="small"
        InputProps={{
          ...InputProps,
          sx: { ...inputStyle, ...InputProps?.sx },
        }}
        InputLabelProps={{
          ...InputLabelProps,
          sx: { ...insideLabelStyle, ...InputLabelProps?.sx },
        }}
        FormHelperTextProps={{
          ...FormHelperTextProps,
          sx: { ...helperTextStyle, ...FormHelperTextProps?.sx },
        }}
        sx={sx}
        label={isLabelOutside ? "" : label}
      />
    </React.Fragment>
  );
};
