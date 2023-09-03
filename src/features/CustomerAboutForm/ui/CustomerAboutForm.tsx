import React, { useEffect, useState } from "react";
import {
  Box,
  FormLabel,
  type BoxProps,
  type TextFieldProps,
  type FormLabelProps,
} from "@mui/material";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { useFormContext } from "react-hook-form";
import { type CustomerAboutFormValues } from "../model/types";
import { type CustomerData } from "../../../shared/types/Customer";

type CustomerAboutFormProps = Pick<BoxProps, "sx"> & {
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
};

export function CustomerAboutForm({
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
}: CustomerAboutFormProps) {
  const isEmailFieldVisible = isContainEmail ?? false;
  const [dateOfBirth, setDateOfBirth] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CustomerAboutFormValues>();
  useEffect(() => {
    if (customerData != null) {
      console.log(customerData.dateOfBirth ?? "");
      setValue("firstName", firstName ?? "");
      setValue("lastName", lastName ?? "");
      setValue("userEmail", email ?? "");
      setValue("userBirthday", new Date(customerData?.dateOfBirth ?? "")); // todo некорректное отображение даты
      setDateOfBirth(customerData?.dateOfBirth);
      setFirstName(customerData?.firstName);
      setLastName(customerData?.lastName);
      setEmail(customerData?.email);
    }
  }, [customerData]);

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
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
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
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
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
          value={dateOfBirth}
          onChange={(event) => {
            setDateOfBirth(event.target.value);
          }}
        />
        {isEmailFieldVisible && (
          <CustomTextField
            label="Email"
            type="email"
            {...emailFieldProps}
            error={errors.userEmail !== undefined}
            helperText={errors.userEmail?.message}
            {...register("userEmail")}
            labelPosition={fieldLabelPosition}
            disabled={disabled}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
