import React from "react";
import {
  Alert,
  Snackbar,
  type AlertProps,
  type SnackbarProps,
} from "@mui/material";

type CustomSnackBarProps = SnackbarProps & {
  severity?: "error" | "warning" | "success" | "info";
  alertProps?: AlertProps;
};

export const CustomSnackBar = ({
  severity,
  open,
  message,
  onClose,
  alertProps,
  ...props
}: CustomSnackBarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} {...props}>
      <Alert
        elevation={6}
        variant="filled"
        severity={severity}
        sx={{ width: "100%" }}
        {...alertProps}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
