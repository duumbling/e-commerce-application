import React from "react";
import { CustomButton, type CustomButtonProps } from "../CustomButton";
import { style } from "./style";
import { Link } from "../Link";
import { type Paths } from "../../constants/paths";
import { backgroundIcon, resolveSx } from "../../lib/helpers/styles";

export type SocialButtonProps = CustomButtonProps & {
  href: Paths | string;
  icon?: string;
};

export function SocialButton({
  icon = "",
  sx,
  ...otherProps
}: SocialButtonProps) {
  return (
    <CustomButton
      component={Link}
      variant="outlined"
      sx={resolveSx(style, backgroundIcon(icon), sx)}
      {...otherProps}
    />
  );
}
