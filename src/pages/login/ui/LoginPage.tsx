import React from "react";
import { Header } from "../../../shared/ui/Header";
import { LoginForm } from "../../../widgets/login-form";
import { Box } from "@mui/material";
import { AuthLayout } from "../../../shared/ui/AuthLayout";
import { customerTokenCache } from "../../../shared/api";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";

export function LoginPage() {
  const isAuthenticated = customerTokenCache.get().token !== "";

  if (isAuthenticated) {
    return <Navigate replace to={Paths.Main} />;
  }

  return (
    <Box>
      <AuthLayout>
        <Header>Вход на сайт</Header>
        <LoginForm />
      </AuthLayout>
    </Box>
  );
}
