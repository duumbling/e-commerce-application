import React from "react";
import { LoginForm } from "../../../widgets/login-form";
import { Box, Grid } from "@mui/material";
import { isUserAuthenticated } from "../../../shared/api";
import { Navigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { Header } from "../../../widgets/Header";

export function LoginPage() {
  if (isUserAuthenticated()) {
    return <Navigate replace to={Paths.Main} />;
  }

  return (
    <Box>
      <Header />
      <Box marginTop={20}>
        <Grid
          container
          rowSpacing={{ xs: "20%", sm: "15%", md: "10%" }}
          columns={4}
          justifyContent="center"
        >
          <Grid item xs={4} sm={4} md={4}>
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
