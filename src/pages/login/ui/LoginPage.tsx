import React from "react";
import { Header } from "../../../shared/ui/Header";
import { LoginForm } from "../../../widgets/login-form";
import { Box, Grid } from "@mui/material";
import { gridContainerProps, gridItemProps, gridHeaderProps } from "./style";

export function LoginPage() {
  return (
    <div>
      <Box>
        <Grid {...gridContainerProps}>
          <Grid {...gridHeaderProps}>
            <Header>Вход на сайт</Header>
          </Grid>
          <Grid {...gridItemProps}>
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
