import React, { useEffect } from "react";
import {
  Box,
  FormLabel,
  type BoxProps,
  type TextFieldProps,
  type FormLabelProps,
} from "@mui/material";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { useFormContext } from "react-hook-form";
import { type AboutFormValues } from "../model/types";

type AboutFormProps = Pick<BoxProps, "sx"> & {
  title: string;
  titleProps: FormLabelProps;
  firstNameFieldProps?: TextFieldProps;
  lastNameFieldProps?: TextFieldProps;
  userBirthDayProps?: TextFieldProps;
  emailFieldProps?: TextFieldProps;
  isContainEmail?: boolean;
  fieldLabelPosition?: "outside" | "inside";
  disabled?: boolean;
};

export const AboutForm = ({
  title,
  titleProps,
  sx,
  firstNameFieldProps,
  lastNameFieldProps,
  userBirthDayProps,
  emailFieldProps,
  isContainEmail,
  fieldLabelPosition,
  disabled,
}: AboutFormProps) => {
  const isEmailFieldVisible = isContainEmail ?? false;

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<AboutFormValues & { showEmail: boolean }>();

  useEffect(() => {
    setValue("showEmail", isEmailFieldVisible);
  }, []);

  return (
    <Box>
      <FormLabel {...titleProps} sx={{ display: "block", ...titleProps?.sx }}>
        {title}
      </FormLabel>
      <Box display="flex" flexDirection="column" sx={sx}>
        <CustomTextField
          label="Имя"
          type="text"
          {...firstNameFieldProps}
          error={errors.firstName !== undefined}
          helperText={errors.firstName?.message}
          {...register("firstName")}
          labelPosition={fieldLabelPosition}
          disabled={disabled}
        />
        <CustomTextField
          label="Фамилия"
          type="text"
          {...lastNameFieldProps}
          error={errors.lastName !== undefined}
          helperText={errors.lastName?.message}
          {...register("lastName")}
          labelPosition={fieldLabelPosition}
          disabled={disabled}
        />
        <CustomTextField
          label="Дата рождения"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...userBirthDayProps}
          error={errors.userBirthday !== undefined}
          helperText={errors.userBirthday?.message}
          {...register("userBirthday")}
          labelPosition={fieldLabelPosition}
          disabled={disabled}
        />
        {isEmailFieldVisible && (
          <CustomTextField
            label="Email"
            type="email"
            {...emailFieldProps}
            error={errors.userEmail !== undefined}
            helperText={errors.userBirthday?.message}
            {...register("userEmail")}
            labelPosition={fieldLabelPosition}
            disabled={disabled}
          />
        )}
      </Box>
    </Box>
  );
};
