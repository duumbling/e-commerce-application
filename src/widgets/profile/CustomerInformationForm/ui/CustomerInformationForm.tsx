import React, { useEffect, useState } from "react";
import {
  formGridItemProps,
  gridContainerProps,
  rootStyle,
  textFieldStyle,
} from "./style";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { CustomButton } from "../../../../shared/ui/CustomButton";
import { customerInformationSchema } from "../model/schema";
import { type CustomerProps } from "../../address-accordion/lib/types";
import { updateCustomerPersonalInformation } from "../../../../shared/api/customers";
import { PRIMARY_COLOR } from "../../../../shared/constants/colors";
import { CustomSnackBar } from "../../../../shared/ui/CustomSnackBar";
import { getErrorMessage } from "../../../registration-form/lib/helpers";
import {
  CustomerAboutForm,
  type CustomerAboutFormValues,
} from "../../../../features/CustomerAboutForm";

export function CustomerInformationForm({
  customerData,
  setCustomerData,
}: CustomerProps) {
  const methods = useForm<CustomerAboutFormValues>({
    resolver: yupResolver(customerInformationSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit } = methods;
  const [isLoading, setLoading] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<number>(0);
  const onSubmit: SubmitHandler<CustomerAboutFormValues> = async (data) => {
    setLoading(true);
    console.log(data.firstName);
    try {
      console.log(data.firstName);
      const response = await updateCustomerPersonalInformation(
        currentVersion,
        data.userEmail,
        data.firstName,
        data.lastName,
        data.userBirthday,
      );
      setCurrentVersion(response.body.version);
      console.log(response);
      setEditMode(false);
      setIsEditSuccess(true);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsEditSuccess(false);
    }
    setLoading(false);
    setMessageVisible(true);
  };
  useEffect(() => {
    if (customerData !== undefined) {
      setCurrentVersion(customerData.version);
    }
  }, [customerData]);
  return (
    <FormProvider {...methods}>
      <form
        id="personal-information"
        onSubmit={(...args) => {
          void handleSubmit(onSubmit)(...args);
        }}
      >
        <Box sx={rootStyle}>
          <Grid {...gridContainerProps} sx={{ flexDirection: "column" }}>
            <Grid {...formGridItemProps}>
              <CustomerAboutForm
                title="Личные данные"
                titleProps={{}}
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
                customerData={customerData}
              />
            </Grid>
            <Grid item sm={6} md={6}>
              <Box>
                <CustomButton
                  type="submit"
                  form="personal-information"
                  onClick={(event) => {
                    if (!isEditMode) {
                      event.preventDefault();
                    }
                    setEditMode(true);
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
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          severity={isEditSuccess ? "success" : "error"}
          autoHideDuration={2000}
          open={isMessageVisible}
          onClose={() => {
            setMessageVisible(false);
          }}
          message={isEditSuccess ? "Данные изменены" : errorMessage}
        />
      </form>
    </FormProvider>
  );
}
