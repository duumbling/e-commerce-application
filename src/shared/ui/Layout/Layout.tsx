import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <footer>--Footer--</footer>
    </div>
  );
};

export { Layout };
