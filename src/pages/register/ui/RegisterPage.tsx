import React from "react";
import { Header } from "../../../shared/ui/Header";
import { RegistrationForm } from "../../../widgets/registration-form";
import { AuthLayout } from "../../../shared/ui/AuthLayout";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { customerTokenCache } from "../../../shared/api";

export function RegisterPage() {
  const isAuthenticated = customerTokenCache.get().token !== "";

  if (isAuthenticated) {
    return <Navigate replace to={Paths.Main} />;
  }
  return (
    <React.Fragment>
      <AuthLayout>
        <Header>Регистрация</Header>
      </AuthLayout>
      <Box marginTop={4.4}>
        <RegistrationForm />
      </Box>
    </React.Fragment>
  );
}
