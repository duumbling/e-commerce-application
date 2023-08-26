import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../../widgets/Footer";
import { Container } from "@mui/material";

export function Layout() {
  return (
    <Container>
      <Outlet />
      <Footer />
    </Container>
  );
}
