import React from "react";
import { Box, Grid, Link } from "@mui/material";
import {
  textFieldStyle,
  firstTextFieldStyle,
  loginButtonStyle,
  linkStyle,
  gridContainerProps,
  gridItemProps,
  rootStyle,
} from "./style";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { PasswordField } from "../../../shared/ui/PasswordField";

export const LoginForm = () => {
  return (
    <form id="login-form">
      <Box sx={rootStyle}>
        <Grid {...gridContainerProps}>
          <Grid {...gridItemProps}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CustomTextField
                type="email"
                label="Email"
                sx={firstTextFieldStyle}
              />
              <PasswordField label="Пароль" sx={textFieldStyle} />
            </Box>
          </Grid>
          <Grid {...gridItemProps}>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={235}
              textAlign="center"
            >
              <CustomButton type="submit" sx={loginButtonStyle}>
                Войти
              </CustomButton>
              <Link href="#" variant="body2" color="inherit" sx={linkStyle}>
                Нет аккаунта? Зарегистрироваться
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
