import React, { useState } from "react";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  FormLabel,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  titleStyle,
  textFieldStyle,
  firstTextFieldStyle,
  registerButtonStyle,
  linkStyle,
  gridContainerProps,
  gridItemProps,
  rootStyle,
  buttonBoxStyle,
  shippingAddressSwitchStyle,
  billingAddressSwitchStyle,
} from "./style";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { AddressForm } from "../../../features/AddressForm";
import { AboutForm } from "../../../features/AboutForm";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { Link } from "../../../shared/ui/Link";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { type RegistrationFormValues } from "../model/types";
import { getErrorMessage } from "../lib/helpers";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar/";
import { formSchema } from "../model/schema";
import { CustomSwitch } from "../../../shared/ui/CustomSwitch/CustomSwitch";
import { registerCustomer } from "../api/registration";
import { Paths } from "../../../shared/constants/paths";
import { loginCustomer } from "../../../shared/api";

export const RegistrationForm = () => {
  const methods = useForm<RegistrationFormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [isCommonAddressChecked, setCommonAddressChecked] = useState(false);

  const [isDefaultShippingAddressChecked, setDefaultShippingAddressChecked] =
    useState(false);
  const [isDefaultBillingAddressChecked, setDefaultBillingAddressChecked] =
    useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isRegistrationSuccess, setSuccess] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    setLoading(true);
    try {
      await registerCustomer(
        data,
        isDefaultShippingAddressChecked,
        isDefaultBillingAddressChecked,
      );
      await loginCustomer({
        email: data.email,
        password: data.password,
      });
      setSuccess(true);
      const timeout = 1000;
      setTimeout(() => {
        navigate(Paths.Main);
      }, timeout);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setSuccess(false);
    }
    setLoading(false);
    setMessageVisible(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        id="registration-form"
        onSubmit={(...args) => {
          void handleSubmit(onSubmit)(...args);
        }}
      >
        <Box sx={rootStyle}>
          <Grid {...gridContainerProps}>
            <Grid {...gridItemProps}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel sx={{ display: "block", ...titleStyle }}>
                  Аккаунт
                </FormLabel>
                <CustomTextField
                  type="email"
                  label="Email"
                  error={errors.email !== undefined}
                  helperText={errors.email?.message}
                  sx={firstTextFieldStyle}
                  {...register("email")}
                />

                <PasswordField
                  label="Пароль"
                  autoComplete="on"
                  error={errors.password !== undefined}
                  helperText={errors.password?.message}
                  sx={textFieldStyle}
                  {...register("password")}
                />

                <PasswordField
                  label="Подтвердите пароль"
                  error={errors.passwordConfirm !== undefined}
                  helperText={errors.passwordConfirm?.message}
                  autoComplete="on"
                  sx={textFieldStyle}
                  {...register("passwordConfirm")}
                />
              </Box>
            </Grid>
            <Grid {...gridItemProps}>
              <AboutForm
                title="О себе"
                titleProps={{ sx: titleStyle }}
                firstNameFieldProps={{
                  sx: firstTextFieldStyle,
                }}
                lastNameFieldProps={{
                  sx: textFieldStyle,
                }}
                userBirthDayProps={{
                  sx: textFieldStyle,
                }}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <AddressForm
                title="Адрес доставки"
                isCommonAddress={isCommonAddressChecked}
                addressType="shippingAddress"
                titleProps={{ sx: titleStyle }}
                countryFieldProps={{
                  sx: {
                    ...firstTextFieldStyle,
                  },
                }}
                cityFieldProps={{
                  sx: textFieldStyle,
                }}
                streetFieldProps={{
                  sx: textFieldStyle,
                }}
                postalCodeFieldProps={{
                  sx: textFieldStyle,
                }}
                switchProps={{
                  onChange: (_, checked) => {
                    setDefaultShippingAddressChecked(checked);
                  },
                  sx: shippingAddressSwitchStyle,
                }}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <AddressForm
                title="Адрес выставления счетов"
                isCommonAddress={isCommonAddressChecked}
                addressType="billingAddress"
                titleProps={{ sx: titleStyle }}
                countryFieldProps={{
                  sx: firstTextFieldStyle,
                }}
                cityFieldProps={{
                  sx: textFieldStyle,
                }}
                streetFieldProps={{
                  sx: textFieldStyle,
                }}
                postalCodeFieldProps={{
                  sx: textFieldStyle,
                }}
                switchProps={{
                  onChange: (_, checked) => {
                    setDefaultBillingAddressChecked(checked);
                  },
                  sx: billingAddressSwitchStyle,
                }}
              />
            </Grid>
            <Grid item sm={6} md={6} sx={buttonBoxStyle}>
              <Box
                display="flex"
                flexDirection="column"
                maxWidth={235}
                textAlign="center"
              >
                <CustomSwitch
                  label="Указать общий адрес"
                  name="common-address"
                  onChange={(_, checked) => {
                    setCommonAddressChecked(checked);
                  }}
                />
                <CustomButton
                  type="submit"
                  form="registration-form"
                  sx={registerButtonStyle}
                >
                  Зарегистрироваться
                </CustomButton>
                <Link href={Paths.Login} underline="always" sx={linkStyle}>
                  Есть аккаунт? Войти
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
          severity={isRegistrationSuccess ? "success" : "error"}
          autoHideDuration={2000}
          open={isMessageVisible}
          onClose={() => {
            setMessageVisible(false);
          }}
          message={
            isRegistrationSuccess ? "Регистрация завершена" : errorMessage
          }
        />
      </form>
    </FormProvider>
  );
};
