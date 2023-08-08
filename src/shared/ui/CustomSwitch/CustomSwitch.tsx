import React from "react";
import {
  FormControlLabel,
  type FormControlProps,
  Switch,
  type SxProps,
  Typography,
} from "@mui/material";

import { bigSizeStyle, smallSizeStyle } from "./style";

type CustomFormControlProps = Pick<FormControlProps, "accessKey">;
type CustomSwitchProps = CustomFormControlProps & {
  label: string;
  sx?: SxProps;
  checked?: boolean;
  customSize?: string;
  handleChange?: () => void;
};

function CustomSwitch({
  label,
  sx,
  customSize = "small",
  checked,
  handleChange,
}: CustomSwitchProps): JSX.Element {
  const style =
    customSize === "big" ? { ...bigSizeStyle } : { ...smallSizeStyle };
  return (
    <FormControlLabel
      control={
        <Switch
          name="gilad"
          size="medium"
          checked={checked}
          onChange={handleChange}
        />
      }
      sx={{ ...style, ...sx }}
      label={<Typography sx={{ ...style }}>{label}</Typography>}
    />
  );
}

export default CustomSwitch;
