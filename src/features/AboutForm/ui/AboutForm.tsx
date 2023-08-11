import React from "react";
import {
  Box,
  FormLabel,
  type BoxProps,
  type TextFieldProps,
  type FormLabelProps,
} from "@mui/material";
import { CustomTextField } from "../../../shared/ui/CustomTextField";

type AboutFormProps = Pick<BoxProps, "sx"> & {
  title: string;
  titleProps: FormLabelProps;
  firstNameFieldProps?: TextFieldProps;
  lastNameFieldProps?: TextFieldProps;
  birthDateFieldProps?: TextFieldProps;
  emailFieldProps?: TextFieldProps;
  isContainEmail?: boolean;
};

export const AboutForm = ({
  title,
  titleProps,
  sx,
  firstNameFieldProps,
  lastNameFieldProps,
  birthDateFieldProps,
  emailFieldProps,
  isContainEmail,
}: AboutFormProps) => {
  return (
    <Box>
      <FormLabel {...titleProps} sx={{ display: "block", ...titleProps?.sx }}>
        {title}
      </FormLabel>
      <Box display="flex" flexDirection="column" sx={sx}>
        <CustomTextField label="Имя" type="text" {...firstNameFieldProps} />
        <CustomTextField label="Фамилия" type="text" {...lastNameFieldProps} />
        <CustomTextField
          label="Дата рождения"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...birthDateFieldProps}
        />
        {isContainEmail ?? false ? (
          <CustomTextField label="Email" type="email" {...emailFieldProps} />
        ) : null}
      </Box>
    </Box>
  );
};
