import React, { useState } from "react";
import { useForm, type SubmitHandler, type Control } from "react-hook-form";
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
import {
  AddressForm,
  type AddressFormValues,
} from "../../../features/AddressForm";
import { AboutForm } from "../../../features/AboutForm";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { createCustomer } from "../../../shared/api";
import { AddressType } from "../model/model";

interface RegistrationFormValues extends AddressFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export const RegistrationForm = () => {
  const { register, control, handleSubmit } = useForm<RegistrationFormValues>();

  const [isDefaultShippingAddressChecked, setDefaultShippingAddressChecked] =
    useState(false);
  const [isDefaultBillingAddressChecked, setDefaultBillingAddressChecked] =
    useState(false);

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
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
        defaultShippingAddress: isDefaultShippingAddressChecked
          ? AddressType.SHIPPING
          : undefined,
        defaultBillingAddress: isDefaultBillingAddressChecked
          ? AddressType.BILLING
          : undefined,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const addressFormControl = control as unknown as Control<AddressFormValues>;

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
                control: addressFormControl,
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
              titleProps={{ sx: titleStyle }}
              countryControllerProps={{
                control: addressFormControl,
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
    </form>
  );
};
