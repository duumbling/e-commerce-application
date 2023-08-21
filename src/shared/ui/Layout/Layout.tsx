import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../../widgets/Footer";

export function Layout() {
  return (
    <div className="wrapper">
      <Outlet />
      <Footer />
    </div>
  );
}
