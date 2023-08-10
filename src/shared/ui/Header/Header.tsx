import React from "react";
import { AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import { Paths } from "../../constants/paths";

// TODO Сделать хедер
export function Header() {
  return (
    <AppBar>
      <Link to={Paths.Main}>Main</Link>
      <Link to={Paths.Login}>Login</Link>
      <Link to={Paths.Login}>Register</Link>
    </AppBar>
  );
}
