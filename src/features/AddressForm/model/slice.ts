import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type AddressFormValues, type Country } from "./types";

type AddressData = Omit<AddressFormValues, "country"> & {
  country: Country | null;
};

interface AddressState {
  billingAddress: AddressData;
  shippingAddress: AddressData;
  commonAddress: AddressData;
  isCommonAddress: boolean;
}

const initialState: AddressState = {
  billingAddress: {
    country: null,
    city: "",
    streetName: "",
    postalCode: "",
  },
  shippingAddress: {
    country: null,
    city: "",
    streetName: "",
    postalCode: "",
  },
  commonAddress: {
    country: null,
    city: "",
    streetName: "",
    postalCode: "",
  },
  isCommonAddress: false,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setCountry(
      state,
      {
        payload,
      }: PayloadAction<{
        data: Country | null;
        field: keyof Pick<AddressState, "billingAddress" | "shippingAddress">;
      }>,
    ) {
      state[payload.field].country = payload.data;
      if (state.isCommonAddress) {
        state.commonAddress.country = payload.data;
      }
    },
    setCity(
      state,
      {
        payload,
      }: PayloadAction<{
        data: string;
        field: keyof Pick<AddressState, "billingAddress" | "shippingAddress">;
      }>,
    ) {
      state[payload.field].city = payload.data;
      if (state.isCommonAddress) {
        state.commonAddress.city = payload.data;
      }
    },
    setStreetName(
      state,
      {
        payload,
      }: PayloadAction<{
        data: string;
        field: keyof Pick<AddressState, "billingAddress" | "shippingAddress">;
      }>,
    ) {
      state[payload.field].streetName = payload.data;
      if (state.isCommonAddress) {
        state.commonAddress.streetName = payload.data;
      }
    },
    setPostalCode(
      state,
      {
        payload,
      }: PayloadAction<{
        data: string;
        field: keyof Pick<AddressState, "billingAddress" | "shippingAddress">;
      }>,
    ) {
      state[payload.field].postalCode = payload.data;
      if (state.isCommonAddress) {
        state.commonAddress.postalCode = payload.data;
      }
    },
    setCommonAddressState(state, action: PayloadAction<boolean>) {
      state.isCommonAddress = action.payload;
    },
  },
});

export const addressReducer = addressSlice.reducer;
