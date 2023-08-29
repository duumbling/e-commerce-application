import React, { useState } from "react";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
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
import { useForm, type SubmitHandler } from "react-hook-form";
import { Paths } from "../../../shared/constants/paths";
import { Link } from "../../../shared/ui/Link";
import { loginCustomer } from "../../../shared/api/customers";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { type LoginFormValues } from "../model/types";
import { getErrorMessage } from "../lib/helpers";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../model/schema";

export const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoginSuccess, setSuccess] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    try {
      await loginCustomer(data);
      setSuccess(true);
      reset({ email: "", password: "" });
      setTimeout(() => {
        navigate(Paths.Main);
      }, 2000);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setSuccess(false);
    }
    setLoading(false);
    setMessageVisible(true);
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
              <CustomTextField
                type="email"
                label="Email"
                sx={firstTextFieldStyle}
                error={errors.email !== undefined}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <PasswordField
                label="Пароль"
                sx={textFieldStyle}
                error={errors.password !== undefined}
                helperText={errors.password?.message}
                {...register("password")}
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
                href={Paths.Register}
                variant="body2"
                sx={linkStyle}
                underline="always"
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </Backdrop>
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={isLoginSuccess ? "success" : "error"}
        autoHideDuration={2000}
        open={isMessageVisible}
        onClose={() => {
          setMessageVisible(false);
        }}
        message={isLoginSuccess ? "Успешно" : errorMessage}
      />
    </form>
  );
};
