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

interface AddressPayload {
  data: Country | string | null;
  addressType: keyof Pick<AddressState, "billingAddress" | "shippingAddress">;
  field: keyof AddressData;
}

const initialAddressData: AddressData = {
  country: null,
  city: "",
  streetName: "",
  postalCode: "",
};

const initialState: AddressState = {
  billingAddress: initialAddressData,
  shippingAddress: initialAddressData,
  commonAddress: initialAddressData,
  isCommonAddress: false,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressDataValue(state, { payload }: PayloadAction<AddressPayload>) {
      if (typeof payload.data === "string" && payload.field !== "country") {
        state[payload.addressType][payload.field] = payload.data ?? "";
        if (state.isCommonAddress) {
          state.commonAddress[payload.field] = payload.data;
        }
      }
      if (typeof payload.data !== "string" && payload.field === "country") {
        state[payload.addressType][payload.field] = payload.data;
        if (state.isCommonAddress) {
          state.commonAddress.country = payload.data;
        }
      }
    },
    setCommonAddressState(state, action: PayloadAction<boolean>) {
      state.isCommonAddress = action.payload;
    },
  },
});

export const addressReducer = addressSlice.reducer;
