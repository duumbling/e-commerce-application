import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">Main</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>

      <Outlet />

      <footer>--Footer--</footer>
    </>
  );
};

export { Layout };
