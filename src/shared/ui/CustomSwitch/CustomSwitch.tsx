import React from "react";
import {
  FormControlLabel,
  Switch,
  Typography,
  type SwitchProps,
} from "@mui/material";

import { bigSizeStyle, smallSizeStyle } from "./style";

type CustomSwitchProps = Pick<
  SwitchProps,
  "onChange" | "sx" | "name" | "checked"
>;

type MyCustomSwitchProps = CustomSwitchProps & {
  label: string;
  customSize?: CustomSize;
};

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
  onChange,
}: MyCustomSwitchProps): JSX.Element {
  const style =
    customSize === CustomSize.BIG ? { ...bigSizeStyle } : { ...smallSizeStyle };
  return (
    <FormControlLabel
      control={<Switch name={name} checked={checked} onChange={onChange} />}
      sx={{ ...style, ...sx }}
      label={<Typography sx={{ ...style }}>{label}</Typography>}
    />
  );
}

export default CustomSwitch;
