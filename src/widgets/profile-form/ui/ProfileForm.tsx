import React, { useState } from "react";
import { AboutForm } from "../../../features/AboutForm";
import {
  buttonBoxStyle,
  firstGridItemProps,
  firstTextFieldStyle,
  gridContainerProps,
  gridItemProps,
  registerButtonStyle,
  rootStyle,
  textFieldStyle,
  titleStyle,
} from "./style";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../../../widgets/registration-form/model/schema";
import { type RegistrationFormValues } from "../../../widgets/registration-form/model/types";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { AddressForm } from "../../../features/AddressForm";

import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../../widgets/registration-form/api/registration";
import { Paths } from "../../../shared/constants/paths";
import { getErrorMessage } from "../../../widgets/login-form/lib/helpers";
import { loginCustomer } from "../../../shared/api";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { CustomSwitch } from "../../../shared/ui/CustomSwitch/CustomSwitch";

export function ProfileForm() {
  const methods = useForm<RegistrationFormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit } = methods;
  const [isCommonAddressChecked, setCommonAddressChecked] = useState(false);
  const [isDefaultShippingAddressChecked, setDefaultShippingAddressChecked] =
    useState(false);
  const [isDefaultBillingAddressChecked, setDefaultBillingAddressChecked] =
    useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isRegistrationSuccess, setSuccess] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setEditMode] = useState(false);

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
            <Grid {...firstGridItemProps}>
              <AboutForm
                title="Личные данные"
                titleProps={{ sx: titleStyle }}
                firstNameFieldProps={{
                  sx: textFieldStyle,
                }}
                lastNameFieldProps={{
                  sx: textFieldStyle,
                }}
                userBirthDayProps={{
                  sx: textFieldStyle,
                }}
                emailFieldProps={{
                  sx: textFieldStyle,
                }}
                isContainEmail={true}
                fieldLabelPosition="outside"
                disabled={!isEditMode}
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
                }}
                fieldLabelPosition="outside"
                disabled={!isEditMode}
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
                }}
                fieldLabelPosition="outside"
                disabled={!isEditMode}
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
                  disabled={!isEditMode}
                />
                <CustomButton
                  type="submit"
                  form="registration-form"
                  onClick={(event) => {
                    event.preventDefault();
                    setEditMode(!isEditMode);
                  }}
                  sx={registerButtonStyle}
                >
                  {isEditMode ? "Сохранить" : "Редактировать"}
                </CustomButton>
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
}
