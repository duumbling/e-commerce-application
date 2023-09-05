import React from "react";
import { RegistrationForm } from "../../../widgets/registration-form";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { isUserAuthenticated } from "../../../shared/api";
import { Header } from "../../../widgets/Header";

export function RegisterPage() {
  if (isUserAuthenticated()) {
    return <Navigate replace to={Paths.Main} />;
  }

  return (
    <>
      <Header />
      <Box marginTop={15}>
        <RegistrationForm />
      </Box>
    </>
  );
}
