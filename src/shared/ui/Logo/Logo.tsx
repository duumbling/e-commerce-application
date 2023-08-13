import React from "react";
import { LogoDevRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Paths } from "../../constants/paths";

// TODO Доделаю логотип, когда решим "как"

export function Logo() {
  return (
    <Link to={Paths.Main}>
      <LogoDevRounded sx={{ fontSize: 60 }} />
    </Link>
  );
}
