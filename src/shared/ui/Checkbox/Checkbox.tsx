import React from "react";

import {
  type FormControlLabelProps,
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { PRIMARY_COLOR } from "../../constants/colors";

export type CheckboxProps = Partial<FormControlLabelProps> & {
  withColor?: boolean;
  color?: string;
};

export function Checkbox({ label, withColor, color, ...props }: CheckboxProps) {
  return (
    <FormControlLabel
      {...props}
      control={<MuiCheckbox sx={{ color: PRIMARY_COLOR, marginRight: 2 }} />}
      label={
        withColor === true ? (
          <React.Fragment>
            <Box
              component="span"
              display="inline-block"
              width={11}
              height={11}
              marginRight={1}
              sx={{ borderRadius: "50%", backgroundColor: color }}
            />
            {label}
          </React.Fragment>
        ) : (
          label
        )
      }
    />
  );
}
