import React, { useState } from "react";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Switch,
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
  commonAddressSwitchLabelStyle,
  rootStyle,
  buttonBoxStyle,
} from "./style";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { AddressForm } from "../../../features/AddressForm";
import { AboutForm } from "../../../features/AboutForm";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { createCustomer } from "../../../shared/api";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { type RegistrationFormValues } from "../model/types";
import { AddressType } from "../model/types";
import { isRegistrationError } from "../lib/helpers";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar/";

export const RegistrationForm = () => {
  const methods = useForm<RegistrationFormValues>();

  const { register, handleSubmit } = methods;

  const [isDefaultShippingAddressChecked, setDefaultShippingAddressChecked] =
    useState(false);
  const [isDefaultBillingAddressChecked, setDefaultBillingAddressChecked] =
    useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isRegistrationSuccess, setSuccess] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    setLoading(true);

    try {
      await createCustomer({
        ...data,
        dateOfBirth: data.userBirthday,
        addresses: [data.shippingAddress, data.billingAddress],
        defaultShippingAddress: isDefaultShippingAddressChecked
          ? AddressType.SHIPPING
          : undefined,
        defaultBillingAddress: isDefaultBillingAddressChecked
          ? AddressType.BILLING
          : undefined,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      if (error instanceof Error && isRegistrationError(error)) {
        const { errors } = error.body;
        if (
          errors[0].code === "DuplicateField" &&
          errors[0].field === "email"
        ) {
          setErrorMessage("Пользователь с таким email уже зарегистрирован");
        } else {
          setErrorMessage("Упс, что-то пошло не так");
        }
      }
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
                  sx={firstTextFieldStyle}
                  {...register("email")}
                />

                <PasswordField
                  label="Пароль"
                  autoComplete="on"
                  sx={textFieldStyle}
                  {...register("password")}
                />

                <PasswordField
                  label="Подтвердите пароль"
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
                }}
              />
            </Grid>
            <Grid {...gridItemProps}>
              <AddressForm
                title="Адрес выставления счетов"
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
                <FormControlLabel
                  control={<Switch />}
                  label="Указать общий адрес"
                  sx={commonAddressSwitchLabelStyle}
                />
                <CustomButton
                  type="submit"
                  form="registration-form"
                  sx={registerButtonStyle}
                >
                  Зарегистрироваться
                </CustomButton>
                <Link href="#" variant="body2" color="inherit" sx={linkStyle}>
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
