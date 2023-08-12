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
import { AddressForm, AboutForm } from "../../../features";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { type FormInput } from "../../../shared/form";
import { createCustomer } from "../../../shared/api";
import { AddressType } from "../model/model";

export const RegistrationForm = () => {
  const { register, control, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const res = await createCustomer({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        addresses: [data.shippingAddress, data.billingAddress],
        shippingAddresses: [AddressType.SHIPPING],
        billingAddresses: [AddressType.BILLING],
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
                ...register("dateOfBirth"),
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <AddressForm
              title="Адрес доставки"
              titleProps={{ sx: titleStyle }}
              countryControllerProps={{
                control,
                name: "shippingAddress.country",
              }}
              countryFieldProps={{
                sx: {
                  ...firstTextFieldStyle,
                  input: {
                    paddingTop: 1.25,
                    paddingBottom: 1.25,
                  },
                },
              }}
              cityFieldProps={{
                sx: textFieldStyle,
                ...register("shippingAddress.city"),
              }}
              streetFieldProps={{
                sx: textFieldStyle,
                ...register("shippingAddress.streetName"),
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
              countryControllerProps={{
                control,
                name: "billingAddress.country",
              }}
              countryFieldProps={{
                sx: firstTextFieldStyle,
              }}
              cityFieldProps={{
                sx: textFieldStyle,
                ...register("billingAddress.city"),
              }}
              streetFieldProps={{
                sx: textFieldStyle,
                ...register("billingAddress.streetName"),
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
