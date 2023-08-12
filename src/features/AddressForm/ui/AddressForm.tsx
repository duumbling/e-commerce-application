import React from "react";
import {
  Box,
  FormLabel,
  Switch,
  FormControlLabel,
  Autocomplete,
  type TextFieldProps,
  type BoxProps,
  type SwitchProps,
  type FormLabelProps,
} from "@mui/material";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import {
  numberFieldStyle,
  formControlStyle,
  titleStyle,
  rootStyle,
  autocompleteStyle,
} from "./style";
import { countries } from "../model/countries";
import { Controller, type Control } from "react-hook-form";

interface AddressFormInputs {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface AddressFormControl {
  shippingAddress: AddressFormInputs;
  billingAddress: AddressFormInputs;
}

interface CountryControllerProps {
  name: "shippingAddress.country" | "billingAddress.country";
  control: Control<AddressFormControl>;
}

type AddressFormProps = Pick<BoxProps, "sx"> & {
  title: string;
  countryControllerProps: CountryControllerProps;
  fieldLabelPosition?: "outside" | "inside";
  titleProps?: FormLabelProps;
  countryFieldProps?: TextFieldProps;
  cityFieldProps?: TextFieldProps;
  streetFieldProps?: TextFieldProps;
  postalCodeFieldProps?: TextFieldProps;
  switchProps?: SwitchProps;
};

export const AddressForm = ({
  sx,
  title,
  fieldLabelPosition,
  titleProps,
  countryControllerProps,
  countryFieldProps,
  cityFieldProps,
  streetFieldProps,
  postalCodeFieldProps,
  switchProps,
}: AddressFormProps) => {
  return (
    <Box sx={{ ...rootStyle, ...sx }}>
      <FormLabel {...titleProps} sx={{ ...titleStyle, ...titleProps?.sx }}>
        {title}
      </FormLabel>
      <Controller
        {...countryControllerProps}
        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            options={countries}
            sx={autocompleteStyle}
            getOptionLabel={(option) => option.name}
            onChange={(_, data) => {
              onChange(data?.code);
            }}
            renderInput={(params) => (
              <CustomTextField
                type="text"
                label="Страна"
                labelPosition={fieldLabelPosition}
                {...countryFieldProps}
                {...params}
                {...field}
                inputProps={{
                  ...params.inputProps,
                  // autoComplete: "new-password",
                }}
                sx={countryFieldProps?.sx}
              />
            )}
          />
        )}
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
        {...postalCodeFieldProps}
        sx={{
          ...numberFieldStyle,
          ...postalCodeFieldProps?.sx,
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
