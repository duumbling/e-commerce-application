import React from "react";
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
}: AboutFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AboutFormValues>();
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
        />
        <CustomTextField
          label="Фамилия"
          type="text"
          {...lastNameFieldProps}
          error={errors.lastName !== undefined}
          helperText={errors.lastName?.message}
          {...register("lastName")}
        />
        <CustomTextField
          label="Дата рождения"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...userBirthDayProps}
          error={errors.userBirthday !== undefined}
          helperText={errors.userBirthday?.message}
          {...register("userBirthday")}
        />
        {isContainEmail ?? false ? (
          <CustomTextField
            label="Email"
            type="email"
            {...emailFieldProps}
            error={errors.userEmail !== undefined}
            helperText={errors.userBirthday?.message}
            {...register("userEmail")}
          />
        ) : null}
      </Box>
    </Box>
  );
};
