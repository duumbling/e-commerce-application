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
import { Controller, useFormContext } from "react-hook-form";
import { type AddressFormContext } from "../model/types";

type AddressFormProps = Pick<BoxProps, "sx"> & {
  title: string;
  addressType: "shippingAddress" | "billingAddress";
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
  addressType,
  countryFieldProps,
  cityFieldProps,
  streetFieldProps,
  postalCodeFieldProps,
  switchProps,
}: AddressFormProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AddressFormContext>();

  return (
    <Box sx={{ ...rootStyle, ...sx }}>
      <FormLabel {...titleProps} sx={{ ...titleStyle, ...titleProps?.sx }}>
        {title}
      </FormLabel>
      <Controller
        control={control}
        name={`${addressType}.country`}
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
                error={errors[addressType]?.country !== undefined}
                helperText={errors[addressType]?.country?.message}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
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
        error={errors[addressType]?.city !== undefined}
        helperText={errors[addressType]?.city?.message}
        {...register(`${addressType}.city`)}
      />
      <CustomTextField
        type="text"
        label="Улица"
        labelPosition={fieldLabelPosition}
        {...streetFieldProps}
        error={errors[addressType]?.streetName !== undefined}
        helperText={errors[addressType]?.streetName?.message}
        {...register(`${addressType}.streetName`)}
      />
      <CustomTextField
        type="number"
        label="Индекс"
        labelPosition={fieldLabelPosition}
        {...postalCodeFieldProps}
        error={errors[addressType]?.postalCode !== undefined}
        helperText={errors[addressType]?.postalCode?.message}
        {...register(`${addressType}.postalCode`)}
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
