import React, { useEffect } from "react";
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
import {
  type AddressFormValues,
  type AddressFormContext,
} from "../model/types";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { addressSlice } from "../model/slice";
import { getOppositeAddressType } from "../lib/helper";

type AddressFormProps = Pick<BoxProps, "sx"> & {
  title: string;
  isCommonAddress: boolean;
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
  isCommonAddress,
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
    setValue,
    formState: { errors },
  } = useFormContext<AddressFormContext>();

  const addressState = useAppSelector((state) => state.addressReducer);
  const {
    setCountry,
    setCity,
    setStreetName,
    setPostalCode,
    setCommonAddressState,
  } = addressSlice.actions;
  const dispatch = useAppDispatch();

  const address = isCommonAddress
    ? addressState.commonAddress
    : addressState[addressType];

  useEffect(() => {
    dispatch(setCommonAddressState(isCommonAddress));
  }, [isCommonAddress]);

  const setAddressValue = (
    addressField: keyof AddressFormValues,
    value: string,
  ): void => {
    setValue(`${addressType}.${addressField}`, value, {
      shouldValidate: true,
    });
    if (isCommonAddress) {
      const anotherAddressType = getOppositeAddressType(addressType);
      setValue(`${anotherAddressType}.${addressField}`, value, {
        shouldValidate: true,
      });
    }
  };

  return (
    <Box sx={{ ...rootStyle, ...sx }}>
      <FormLabel {...titleProps} sx={{ ...titleStyle, ...titleProps?.sx }}>
        {title}
      </FormLabel>
      <Controller
        control={control}
        name={`${addressType}.country`}
        render={({ field }) => (
          <Autocomplete
            options={countries}
            sx={autocompleteStyle}
            getOptionLabel={(option) => option.name}
            value={address.country}
            onChange={(_, data) => {
              dispatch(setCountry({ data, field: addressType }));
              setAddressValue("country", data?.code ?? "");
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
        value={address.city}
        onChange={({ target }) => {
          dispatch(setCity({ data: target.value, field: addressType }));
          setAddressValue("city", target.value);
        }}
      />
      <CustomTextField
        type="text"
        label="Улица"
        labelPosition={fieldLabelPosition}
        {...streetFieldProps}
        error={errors[addressType]?.streetName !== undefined}
        helperText={errors[addressType]?.streetName?.message}
        {...register(`${addressType}.streetName`)}
        value={address.streetName}
        onChange={({ target }) => {
          dispatch(setStreetName({ data: target.value, field: addressType }));
          setAddressValue("streetName", target.value);
        }}
      />
      <CustomTextField
        type="number"
        label="Индекс"
        labelPosition={fieldLabelPosition}
        {...postalCodeFieldProps}
        error={errors[addressType]?.postalCode !== undefined}
        helperText={errors[addressType]?.postalCode?.message}
        {...register(`${addressType}.postalCode`)}
        value={address.postalCode}
        onChange={({ target }) => {
          dispatch(setPostalCode({ data: target.value, field: addressType }));
          setAddressValue("postalCode", target.value);
        }}
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
