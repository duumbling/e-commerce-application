import React from "react";
import { Header } from "../../../shared/ui/Header";
import { RegistrationForm } from "../../../widgets/registration-form";
import { AuthLayout } from "../../../shared/ui/AuthLayout";
import { Box } from "@mui/material";

export function RegisterPage() {
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
