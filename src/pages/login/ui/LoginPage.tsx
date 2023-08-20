import React from "react";
import { Header } from "../../../shared/ui/Header";
import { LoginForm } from "../../../widgets/login-form";
import { Box } from "@mui/material";
import { AuthLayout } from "../../../shared/ui/AuthLayout";

export function LoginPage() {
  return (
    <Box>
      <AuthLayout>
        <Header>Вход на сайт</Header>
        <LoginForm />
      </AuthLayout>
    </Box>
  );
}
