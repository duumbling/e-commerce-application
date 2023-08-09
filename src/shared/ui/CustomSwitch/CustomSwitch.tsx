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
  customSize?: string;
  handleChange?: () => void;
}

const enum CustomSize {
  Big = "big",
  Small = "small",
}

function CustomSwitch({
  label,
  sx,
  name,
  checked,
  customSize = CustomSize.Small,
  handleChange,
}: CustomSwitchProps): JSX.Element {
  const style =
    customSize === CustomSize.Big ? { ...bigSizeStyle } : { ...smallSizeStyle };
  return (
    <FormControlLabel
      control={<Switch name={name} checked={checked} onChange={handleChange} />}
      sx={{ ...style, ...sx }}
      label={<Typography sx={{ ...style }}>{label}</Typography>}
    />
  );
}

export default CustomSwitch;
