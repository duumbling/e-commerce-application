import React from "react";
import { RegistrationForm } from "../../../widgets/registration-form";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { customerTokenCache } from "../../../shared/api";
import { Header } from "../../../widgets/Header";

export function RegisterPage() {
  const isAuthenticated = customerTokenCache.get().token !== "";

  if (isAuthenticated) {
    return <Navigate replace to={Paths.Main} />;
  }
  return (
    <React.Fragment>
      <Header />
      <Box marginTop={15}>
        <RegistrationForm />
      </Box>
    </React.Fragment>
  );
}
