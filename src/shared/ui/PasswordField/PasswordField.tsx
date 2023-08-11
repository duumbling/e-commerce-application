import React, { useState, forwardRef } from "react";
import { IconButton, InputAdornment, type TextFieldProps } from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const PasswordField = forwardRef<HTMLDivElement, TextFieldProps>(
  function PasswordField({ label, sx, InputProps, ...props }, ref) {
    const [isPasswordVisible, setPasswordVisibleState] = useState(false);

    return (
      <CustomTextField
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        label={label}
        sx={sx}
        inputRef={ref}
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
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
      />
    );
  },
);
