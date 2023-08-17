import React, { type SVGProps } from "react";
import { Link } from "react-router-dom";
import { Paths } from "../../constants/paths";
import { ReactComponent as IconLogo } from "../assets/logo/fo-logo.svg";

export function Logo({
  width = "8rem",
  ...otherProps
}: SVGProps<SVGSVGElement>) {
  return (
    <Link to={Paths.Main}>
      <IconLogo width={width} {...otherProps}></IconLogo>
    </Link>
  );
}
