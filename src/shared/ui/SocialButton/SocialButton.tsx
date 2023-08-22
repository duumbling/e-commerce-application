import React, { type ComponentProps } from "react";
import { CustomButton } from "../CustomButton";

import { style } from "./style";
import { resolveSx } from "../../lib/helpers/resolveSx";

export type SocialButtonProps = ComponentProps<typeof CustomButton> & {
  text?: string;
  icon?: string;
  href: string;
};

export function SocialButton({
  href,
  icon = "",
  text = "",
  sx,
  ...otherProps
}: SocialButtonProps) {
  const sxStyle = resolveSx(
    style,
    {
      background: `url(${icon}) no-repeat center`,
    },
    sx,
  );

  return (
    <CustomButton variant="outlined" sx={sxStyle} {...otherProps}>
      {text}
    </CustomButton>
  );
}
