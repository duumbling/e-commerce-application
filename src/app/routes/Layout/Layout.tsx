import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../../widgets/Footer";
import { Container } from "@mui/material";
import { Header } from "../../../widgets/Header";

export function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}
