import React from "react";
import { AppBar } from "@mui/material";
import { Link } from "react-router-dom";

// TODO Сделать хедер
export function Header() {
  return (
    <AppBar>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </AppBar>
  );
}
