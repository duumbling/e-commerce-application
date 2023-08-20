import React, { useEffect } from "react";
import { Header } from "../../../shared/ui/Header";
import { LoginForm } from "../../../widgets/login-form";
import { Box, Grid } from "@mui/material";
import { gridContainerProps, gridItemProps, gridHeaderProps } from "./style";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { customerTokenCache } from "../../../shared/api/tokens";

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
      <Grid {...gridContainerProps}>
        <Grid {...gridHeaderProps} {...gridItemProps}>
          <Header>Вход на сайт</Header>
        </Grid>
        <Grid {...gridItemProps}>
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
}
