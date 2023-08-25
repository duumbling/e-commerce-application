import React from "react";
import {
  FormControlLabel,
  Switch,
  Typography,
  type SwitchProps,
  type SxProps,
  type Theme,
} from "@mui/material";

import { bigSizeStyle, smallSizeStyle } from "./style";

type CustomSwitchProps = Pick<
  SwitchProps,
  "onChange" | "sx" | "name" | "checked"
>;

type MyCustomSwitchProps = CustomSwitchProps & {
  label: string;
  labelStyle?: SxProps<Theme>;
  customSize?: CustomSize;
};

const enum CustomSize {
  BIG = "big",
  SMALL = "small",
}

export function CustomSwitch({
  label,
  sx,
  name,
  checked,
  labelStyle,
  customSize = CustomSize.SMALL,
  onChange,
}: MyCustomSwitchProps): JSX.Element {
  const style =
    customSize === CustomSize.BIG ? { ...bigSizeStyle } : { ...smallSizeStyle };
  return (
    <FormControlLabel
      control={<Switch name={name} checked={checked} onChange={onChange} />}
      sx={{ ...style, ...sx }}
      label={<Typography sx={{ ...style, ...labelStyle }}>{label}</Typography>}
    />
  );
}
