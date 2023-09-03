import React, { useEffect, useState } from "react";
import { Box, Autocomplete, type BoxProps, Grid } from "@mui/material";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { type AddressFormValues } from "../../../../features/AddressForm/model/types";
import { countries } from "../../../../features/AddressForm/model/countries";
import { CustomTextField } from "../../../../shared/ui/CustomTextField";
import { type Country, type addressFormValues } from "../model/types";
import { CustomButton } from "../../../../shared/ui/CustomButton";
import { CustomSwitch } from "../../../../shared/ui/CustomSwitch/CustomSwitch";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addAddress,
  changeAddressData,
} from "../../../../shared/api/customers";
import { addressFormSchema } from "../model/schema";
import { type AddressInformation } from "../../../../features/AddressCard";
import {
  billingDefaultStatusHandler,
  billingStatusHandler,
  shippingDefaultStatusHandler,
  shippingStatusHandler,
} from "./lib/hellpers";
import {
  autocompleteStyle,
  buttonBoxStyle,
  firstGridItemStyle,
  gridContainerStyle,
  gridItemStyle,
  rootStyle,
  textFieldStyle,
  switchBoxStyle,
  switchItemStyle,
  switchStyle,
  submitButtonStyle,
} from "./style";

type AddressFormProps = Pick<BoxProps, "sx"> & {
  fieldLabelPosition?: "outside" | "inside";
  disabled?: boolean;
  addressData?: AddressFormValues;
  customerVersion: number;
  addressID?: string;
  closeCard?: () => void;
  addMode: boolean;
  defaultAddressTypes?: AddressInformation;
  setAddMode?: (addMode: boolean) => void;
};

export function CustomerAddressForm({
  fieldLabelPosition,
  disabled,
  addressData,
  customerVersion,
  addressID,
  closeCard,
  addMode,
  defaultAddressTypes,
  setAddMode,
}: AddressFormProps) {
  const [autocompleteValue, setAutocompleteValue] = useState<Country | null>(
    null,
  );
  const [currentVersion, setCurrentVersion] = useState<number>(customerVersion);
  const [isBilling, setIsBilling] = useState(false);
  const [isBillingDefault, setIsBillingDefault] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isShippingDefault, setIsShippingDefault] = useState(false);
  const [addressTypes, setAddressTypes] = useState<AddressInformation>();
  useEffect(() => {
    console.log(currentVersion);
    if (addressData !== undefined) {
      const value = countries.find(
        (country) => country.name === addressData.country,
      );
      if (value !== undefined) {
        setAutocompleteValue(value);
      }
      setValue(`address.country`, addressData.country, {
        shouldValidate: true,
      });
      setValue(`address.city`, addressData.city, {
        shouldValidate: true,
      });
      setValue(`address.streetName`, addressData.streetName, {
        shouldValidate: true,
      });
      setValue(`address.postalCode`, addressData.postalCode, {
        shouldValidate: true,
      });
    }
    setIsBilling(defaultAddressTypes?.isBilling ?? false);
    setIsShipping(defaultAddressTypes?.isShipping ?? false);
    setIsBillingDefault(defaultAddressTypes?.isBillingDefault ?? false);
    setIsShippingDefault(defaultAddressTypes?.isShippingDefault ?? false);
    setCurrentVersion(customerVersion);
    setAddressTypes(defaultAddressTypes);
  }, []);
  // const currentVersionUpdate = (count: number) => {
  //   setCurrentVersion(count);
  // };

  const {
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<addressFormValues>({
    resolver: yupResolver(addressFormSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const setAddressValue = (
    addressField: keyof AddressFormValues,
    value: string,
  ): void => {
    setValue(`address.${addressField}`, value, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<addressFormValues> = async (data) => {
    try {
      if (addMode && setAddMode !== undefined) {
        const key = Date.now().toString();
        const response = await addAddress(key, data.address, currentVersion);
        setAddMode(!addMode);
        setCurrentVersion(response.body.version);
      }

      if (addressID !== undefined && addressTypes !== undefined) {
        const response = await changeAddressData(
          data.address,
          addressID,
          currentVersion,
        );
        setCurrentVersion(response.body.version);
        if (closeCard != null) {
          closeCard();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      id={addressID}
      onSubmit={(...args) => {
        void handleSubmit(onSubmit)(...args);
      }}
    >
      <Box sx={rootStyle}>
        <Grid sx={{ ...gridContainerStyle }}>
          <Grid sx={{ ...gridItemStyle, ...firstGridItemStyle }}>
            <Controller
              control={control}
              name="address.country"
              render={({ field }) => (
                <Autocomplete
                  disabled={disabled}
                  options={countries}
                  sx={autocompleteStyle}
                  getOptionLabel={(option) => option.name}
                  value={autocompleteValue}
                  onChange={(_, newValue: Country | null) => {
                    setAutocompleteValue(newValue);
                    if (newValue !== null) {
                      setValue(`address.country`, newValue.name, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      type="text"
                      label="Страна"
                      {...register("address.country")}
                      labelPosition={fieldLabelPosition}
                      {...params}
                      {...field}
                      error={errors.address?.country !== undefined}
                      helperText={errors.address?.country?.message}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      sx={textFieldStyle}
                    />
                  )}
                />
              )}
            />

            <CustomTextField
              type="text"
              label="Город"
              labelPosition={fieldLabelPosition}
              error={errors.address?.city !== undefined}
              helperText={errors.address?.city?.message}
              {...register("address.city")}
              onChange={({ target }) => {
                const field = "city";
                setAddressValue(field, target.value);
              }}
              disabled={disabled}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid sx={{ ...gridItemStyle }}>
            {" "}
            <CustomTextField
              type="text"
              label="Улица"
              labelPosition={fieldLabelPosition}
              error={errors.address?.streetName !== undefined}
              helperText={errors.address?.streetName?.message}
              {...register("address.streetName")}
              onChange={({ target }) => {
                const field = "streetName";
                setAddressValue(field, target.value);
              }}
              disabled={disabled}
              sx={textFieldStyle}
            />
            <CustomTextField
              type="number"
              label="Индекс"
              labelPosition={fieldLabelPosition}
              error={errors.address?.postalCode !== undefined}
              helperText={errors.address?.postalCode?.message}
              {...register("address.postalCode")}
              onChange={({ target }) => {
                const field = "postalCode";
                setAddressValue(field, target.value);
              }}
              disabled={disabled}
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>
        {!addMode && (
          <Grid sx={switchBoxStyle}>
            <Grid sx={switchItemStyle}>
              <CustomSwitch
                label={`Адрес доставки`}
                labelStyle={switchStyle}
                checked={isShipping}
                onChange={() => {
                  setIsShipping(!isShipping);
                  if (isShipping) {
                    setIsShippingDefault(false);
                  }
                  void shippingStatusHandler(
                    addressID ?? "",
                    currentVersion,
                    {
                      isShipping,
                    },
                    setCurrentVersion,
                  );
                }}
              />
              <CustomSwitch
                label={`Адрес доставки по умолчанию`}
                labelStyle={switchStyle}
                checked={isShippingDefault}
                onChange={() => {
                  setIsShippingDefault(!isShippingDefault);
                  if (!isShippingDefault) {
                    setIsShipping(true);
                  }
                  void shippingDefaultStatusHandler(
                    addressID ?? "",
                    currentVersion,
                    {
                      isShippingDefault,
                    },
                    setCurrentVersion,
                  );
                }}
              />
            </Grid>

            <Grid sx={switchItemStyle}>
              <CustomSwitch
                label={`Адрес выставления счетов`}
                labelStyle={switchStyle}
                checked={isBilling}
                onChange={() => {
                  setIsBilling(!isBilling);
                  if (isBilling) {
                    setIsBillingDefault(false);
                  }
                  void billingStatusHandler(
                    addressID ?? "",
                    currentVersion,
                    {
                      isBilling,
                    },
                    setCurrentVersion,
                  );
                }}
              />
              <CustomSwitch
                label={`Адрес выставления счетов по умолчанию`}
                labelStyle={switchStyle}
                checked={isBillingDefault}
                onChange={() => {
                  setIsBillingDefault(!isBillingDefault);
                  if (!isBillingDefault) {
                    setIsBilling(true);
                  }
                  void billingDefaultStatusHandler(
                    addressID ?? "",
                    currentVersion,
                    {
                      isBillingDefault,
                    },
                    setCurrentVersion,
                  );
                }}
              />
            </Grid>
          </Grid>
        )}
        <Grid item sm={6} md={6} sx={buttonBoxStyle}>
          <CustomButton type="submit" form={addressID} sx={submitButtonStyle}>
            {addMode ? "Добавить" : "Сохранить"}
          </CustomButton>
        </Grid>
      </Box>
    </form>
  );
}
