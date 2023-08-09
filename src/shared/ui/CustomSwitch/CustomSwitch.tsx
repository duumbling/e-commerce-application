import React from "react";
import {
  FormControlLabel,
  Switch,
  type SxProps,
  Typography,
} from "@mui/material";

import { bigSizeStyle, smallSizeStyle } from "./style";

interface CustomSwitchProps {
  label: string;
  sx?: SxProps;
  name: string;
  checked?: boolean;
  customSize?: CustomSize;
  handleChange?: () => void;
}

const enum CustomSize {
  BIG = "big",
  SMALL = "small",
}

function CustomSwitch({
  label,
  sx,
  name,
  checked,
  customSize = CustomSize.SMALL,
  handleChange,
}: CustomSwitchProps): JSX.Element {
  const style =
    customSize === CustomSize.BIG ? { ...bigSizeStyle } : { ...smallSizeStyle };
  return (
    <FormControlLabel
      control={<Switch name={name} checked={checked} onChange={handleChange} />}
      sx={{ ...style, ...sx }}
      label={<Typography sx={{ ...style }}>{label}</Typography>}
    />
  );
}

export default CustomSwitch;
