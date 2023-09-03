import React, { type ChangeEvent, useEffect } from "react";
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
import { type CustomerData } from "../../../shared/types/Customer";

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
  customerData?: CustomerData;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
  customerData,
  onChange,
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
          value={customerData?.firstName}
          onChange={onChange}
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
          value={customerData?.lastName}
          onChange={onChange}
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
          value={customerData?.dateOfBirth}
          onChange={onChange}
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
            value={customerData?.email}
            onChange={onChange}
          />
        )}
      </Box>
    </Box>
  );
};
