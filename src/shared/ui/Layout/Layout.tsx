import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <footer>--Footer--</footer>
    </div>
  );
}
