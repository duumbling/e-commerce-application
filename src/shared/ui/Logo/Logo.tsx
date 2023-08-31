import React, { type SVGProps } from "react";
import { Link } from "react-router-dom";
import { Paths } from "../../constants/paths";
import { IconLogoBig } from "../assets/icons/logo";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <Link to={Paths.Main}>
      <IconLogoBig width="3.8rem" {...props} />
    </Link>
  );
}
