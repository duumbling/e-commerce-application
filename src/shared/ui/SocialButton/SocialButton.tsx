import React from "react";
import { CustomButton } from "../CustomButton";
import { Link } from "@mui/material";
import { style } from "./style";
import { resolveSx } from "../../lib/helpers/resolveSx";

export type SocialButtonProps = React.ComponentProps<typeof CustomButton> &
  SocialButtonData;

export interface SocialButtonData {
  text?: string;
  icon?: string;
  href: string;
}

export function SocialButton({
  href,
  icon = "",
  text = "",
  ...otherProps
}: SocialButtonProps) {
  const { sx } = otherProps;

  return (
    <Link href={href}>
      <CustomButton
        sx={resolveSx(
          {
            background: `url(${icon}) no-repeat center`,
          },
          style,
          sx,
        )}
        {...otherProps}
      >
        {text}
      </CustomButton>
    </Link>
  );
}
