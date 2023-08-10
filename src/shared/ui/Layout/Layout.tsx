import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="wrapper">
      <Outlet />
      <footer>--Footer--</footer>
    </div>
  );
}
