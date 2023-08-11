import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Switch,
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

import { AddressForm } from "../../../features";
import { AboutForm } from "../../../features/AboutForm";
import { PasswordField } from "../../../shared/ui/PasswordField";

interface AddressFormInputs {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

interface FormInput {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  shippingAddress: AddressFormInputs;
  billingAddress: AddressFormInputs;
}

export const RegistrationForm = () => {
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
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
                sx={textFieldStyle}
                {...register("password")}
              />

              <PasswordField
                label="Подтвердите пароль"
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
                ...register("firstName"),
              }}
              lastNameFieldProps={{
                sx: textFieldStyle,
                ...register("lastName"),
              }}
              birthDateFieldProps={{
                sx: textFieldStyle,
                ...register("birthDate"),
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <AddressForm
              title="Адрес доставки"
              titleProps={{ sx: titleStyle }}
              countryFieldProps={{
                sx: firstTextFieldStyle,
                ...register("shippingAddress.country"),
              }}
              cityFieldProps={{
                sx: textFieldStyle,
                ...register("shippingAddress.city"),
              }}
              streetFieldProps={{
                sx: textFieldStyle,
                ...register("shippingAddress.street"),
              }}
              postalCodeFieldProps={{
                sx: textFieldStyle,
                ...register("shippingAddress.postalCode"),
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <AddressForm
              title="Адрес выставления счетов"
              titleProps={{ sx: titleStyle }}
              countryFieldProps={{
                sx: firstTextFieldStyle,
                ...register("billingAddress.country"),
              }}
              cityFieldProps={{
                sx: textFieldStyle,
                ...register("billingAddress.city"),
              }}
              streetFieldProps={{
                sx: textFieldStyle,
                ...register("billingAddress.street"),
              }}
              postalCodeFieldProps={{
                sx: textFieldStyle,
                ...register("billingAddress.postalCode"),
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
    </form>
  );
};
