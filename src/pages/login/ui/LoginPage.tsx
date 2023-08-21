import React, { useEffect } from "react";
import { Header } from "../../../shared/ui/Header";
import { LoginForm } from "../../../widgets/login-form";
import { Box } from "@mui/material";
import { AuthLayout } from "../../../shared/ui/AuthLayout";
import { customerTokenCache } from "../../../shared/api";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";

export function LoginPage() {
  const cachedToken = customerTokenCache.get().token;
  const navigate = useNavigate();
  useEffect((): void => {
    if (cachedToken !== "") {
      navigate(Paths.Main);
    }
  }, [cachedToken]);
  return (
    <Box>
      <AuthLayout>
        <Header>Вход на сайт</Header>
        <LoginForm />
      </AuthLayout>
    </Box>
  );
}
