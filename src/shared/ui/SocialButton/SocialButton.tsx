import React, { type ComponentProps } from "react";
import { CustomButton } from "../CustomButton";

import { style } from "./style";
import { Link } from "../Link";
import { type Paths } from "../../constants/paths";
import { bgIconCenter, resolveSx } from "../../lib/helpers/styles";

export type SocialButtonProps = ComponentProps<typeof CustomButton> & {
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
      sx={resolveSx(style, bgIconCenter(icon), sx)}
      {...otherProps}
    />
  );
}
