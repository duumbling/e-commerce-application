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
import {
  useForm,
  type SubmitHandler,
  Controller,
  useFormState,
} from "react-hook-form";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../shared/lib/validation/login";

export const LoginForm = () => {
  interface Inputs {
    email: string;
    password: string;
  }
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { errors } = useFormState({ control });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <form
      id="login-form"
      onSubmit={(...args) => {
        void handleSubmit(onSubmit)(...args);
      }}
    >
      <Box sx={rootStyle}>
        <Grid {...gridContainerProps}>
          <Grid {...gridItemProps}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Controller
                name="email"
                rules={EmailValidation}
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    type="email"
                    label="Email"
                    sx={firstTextFieldStyle}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    value={field.value}
                    error={errors.email !== undefined}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                rules={PasswordValidation}
                control={control}
                render={({ field }) => (
                  <PasswordField
                    label="Пароль"
                    sx={textFieldStyle}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    value={field.value}
                    error={errors.password !== undefined}
                    helperText={errors.password?.message}
                  />
                )}
              />
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
              <Link
                href="/register"
                variant="body2"
                color="inherit"
                sx={linkStyle}
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
