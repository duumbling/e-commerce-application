import React, { useState } from "react";
import { IconButton, InputAdornment, type TextFieldProps } from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const PasswordField = ({
  label,
  sx,
  InputProps,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setPasswordVisibleState] = useState(false);

  return (
    <CustomTextField
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      label={label}
      sx={sx}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setPasswordVisibleState(!isPasswordVisible);
              }}
              edge="end"
            >
              {isPasswordVisible ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );
};
