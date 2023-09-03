import React, { useState } from "react";
import {
  formGridItemProps,
  gridContainerProps,
  rootStyle,
  textFieldStyle,
  dateFieldStyle,
} from "./style";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { AboutForm } from "../../../../features/AboutForm";
import { PRIMARY_COLOR } from "../../../../shared/constants/colors";
import { CustomButton } from "../../../../shared/ui/CustomButton";
import { CustomSnackBar } from "../../../../shared/ui/CustomSnackBar";
import { getErrorMessage } from "../../../login-form/lib/helpers";
import { formSchema } from "../../../registration-form/model/schema";
import { type RegistrationFormValues } from "../../../registration-form/model/types";
import { type CustomerProps } from "../../index";

export function CustomerInformationForm({
  customerData,
  setCustomerData,
}: CustomerProps) {
  const methods = useForm<RegistrationFormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit } = methods;
  const [isLoading, setLoading] = useState(false);
  const [isRegistrationSuccess, setSuccess] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    setLoading(true);
    try {
      /* empty */
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
          <Grid {...gridContainerProps} sx={{ flexDirection: "column" }}>
            <Grid {...formGridItemProps}>
              <AboutForm
                title="Личные данные"
                titleProps={{}}
                firstNameFieldProps={{
                  sx: textFieldStyle,
                }}
                lastNameFieldProps={{
                  sx: textFieldStyle,
                }}
                userBirthDayProps={{
                  sx: dateFieldStyle,
                }}
                emailFieldProps={{
                  sx: textFieldStyle,
                }}
                isContainEmail={true}
                fieldLabelPosition="outside"
                disabled={!isEditMode}
                customerData={customerData}
              />
            </Grid>
            <Grid item sm={6} md={6}>
              <Box>
                <CustomButton
                  type="submit"
                  form="registration-form"
                  onClick={(event) => {
                    event.preventDefault();
                    setEditMode(!isEditMode);
                  }}
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
