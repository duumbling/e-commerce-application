import React from "react";
import {
  Box,
  FormLabel,
  type BoxProps,
  type TextFieldProps,
  Switch,
  FormControlLabel,
  type SwitchProps,
  type FormLabelProps,
} from "@mui/material";
import { CustomTextField } from "../../../shared/ui/CustomTextField/CustomTextField";
import {
  numberFieldStyle,
  formControlStyle,
  titleStyle,
  rootStyle,
} from "./style";

type AddressFormProps = Pick<BoxProps, "sx"> & {
  title: string;
  fieldLabelPosition?: "outside" | "inside";
  titleProps?: FormLabelProps;
  countryFieldProps?: TextFieldProps;
  cityFieldProps?: TextFieldProps;
  streetFieldProps?: TextFieldProps;
  indexFieldProps?: TextFieldProps;
  switchProps?: SwitchProps;
};

export const AddressForm = ({
  sx,
  title,
  fieldLabelPosition,
  titleProps,
  countryFieldProps,
  cityFieldProps,
  streetFieldProps,
  indexFieldProps,
  switchProps,
}: AddressFormProps) => {
  return (
    <Box sx={{ ...rootStyle, ...sx }}>
      <FormLabel {...titleProps} sx={{ ...titleStyle, ...titleProps?.sx }}>
        {title}
      </FormLabel>
      <CustomTextField
        type="text"
        label="Страна"
        labelPosition={fieldLabelPosition}
        {...countryFieldProps}
      />
      <CustomTextField
        type="text"
        label="Город"
        labelPosition={fieldLabelPosition}
        {...cityFieldProps}
      />
      <CustomTextField
        type="text"
        label="Улица"
        labelPosition={fieldLabelPosition}
        {...streetFieldProps}
      />
      <CustomTextField
        type="number"
        label="Индекс"
        labelPosition={fieldLabelPosition}
        {...streetFieldProps}
        sx={{
          ...numberFieldStyle,
          ...indexFieldProps?.sx,
        }}
      />
      <FormControlLabel
        control={<Switch {...switchProps} />}
        label={`${title} по умолчанию`}
        sx={formControlStyle}
      />
    </Box>
  );
};
