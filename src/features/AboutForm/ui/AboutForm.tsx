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
  const { register } = useFormContext();
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
          {...register("firstName")}
        />
        <CustomTextField
          label="Фамилия"
          type="text"
          {...lastNameFieldProps}
          {...register("lastName")}
        />
        <CustomTextField
          label="Дата рождения"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...userBirthDayProps}
          {...register("userBirthday")}
        />
        {isContainEmail ?? false ? (
          <CustomTextField
            label="Email"
            type="email"
            {...emailFieldProps}
            {...register("email")}
          />
        ) : null}
      </Box>
    </Box>
  );
};
