import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { CustomButton } from "../../../shared/ui/CustomButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { type ObjectSchema, object } from "yup";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../../shared/lib/validation";
import { PasswordField } from "../../../shared/ui/PasswordField";
import { changeCustomerPassword } from "../api/change-password";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";

interface ChangePasswordValues {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export const formSchema: ObjectSchema<ChangePasswordValues> = object({
  oldPassword: validatePassword(),
  password: validatePassword(),
  passwordConfirm: validatePasswordConfirm(),
});

export function ChangePasswordAccordion() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm<ChangePasswordValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ChangePasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      await changeCustomerPassword(data.oldPassword, data.password);
      setIsSuccess(true);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "The given current password does not match."
      ) {
        setErrorMessage("Неправильный пароль");
      } else {
        setErrorMessage("Что-то пошло не так...");
      }
      setIsSuccess(false);
    }
    setIsLoading(false);
    setIsMessageVisible(true);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          id="change-password-form"
          onSubmit={(...args) => {
            void handleSubmit(onSubmit)(...args);
          }}
        >
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Пароль
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={2}>
                <PasswordField
                  label="Текущий пароль"
                  autoComplete="on"
                  error={errors.oldPassword !== undefined}
                  helperText={errors.oldPassword?.message}
                  {...register("oldPassword")}
                />
                <PasswordField
                  label="Новый пароль"
                  autoComplete="on"
                  error={errors.password !== undefined}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
                <PasswordField
                  label="Подтвердите пароль"
                  autoComplete="on"
                  error={errors.passwordConfirm !== undefined}
                  helperText={errors.passwordConfirm?.message}
                  {...register("passwordConfirm")}
                />
                <CustomButton type="submit" form="change-password-form">
                  Изменить пароль
                </CustomButton>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </form>
      </FormProvider>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </Backdrop>
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={isSuccess ? "success" : "error"}
        autoHideDuration={1000}
        open={isMessageVisible}
        onClose={() => {
          setIsMessageVisible(false);
        }}
        message={isSuccess ? "Пароль успешно изменен" : errorMessage}
      />
    </>
  );
}
