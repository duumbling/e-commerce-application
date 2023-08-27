import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type FilterStatePriceItem,
  type FilterEnumPayload,
  type FilterState,
} from "./types";
import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

const initialState: FilterState = {
  brandFilter: {
    name: "brand",
    values: [],
  },
  colorFilter: {
    name: "color",
    values: [],
  },
  priceFilter: {
    min: 0,
    max: 0,
  },
  sizeFilter: [],
};

const getUpdatedFilterArray = (
  values: AttributePlainEnumValue[],
  incomingValue: AttributePlainEnumValue,
): AttributePlainEnumValue[] =>
  values.find((brand) => brand.key === incomingValue.key) !== undefined
    ? values.filter((value) => value.key !== incomingValue.key)
    : [...values, incomingValue];

export const filterSlice = createSlice({
  name: "products-filter",
  initialState,
  reducers: {
    updateEnumFilters(
      state,
      { payload: { name, data } }: PayloadAction<FilterEnumPayload>,
    ) {
      switch (name) {
        case state.brandFilter.name:
          state.brandFilter.values = getUpdatedFilterArray(
            state.brandFilter.values,
            data,
          );
          break;
        case state.colorFilter.name:
          state.colorFilter.values = getUpdatedFilterArray(
            state.colorFilter.values,
            data,
          );
          break;
        default:
          return state;
      }
    },
    updatePriceFilter(state, { payload }: PayloadAction<FilterStatePriceItem>) {
      state.priceFilter.min = payload.min;
      state.priceFilter.max = payload.max;
    },
    updateSizeFilter(state, { payload }: PayloadAction<number>) {
      if (state.sizeFilter.includes(payload)) {
        state.sizeFilter = state.sizeFilter.filter((size) => size !== payload);
      } else {
        state.sizeFilter.push(payload);
      }
    },
  },
});

export const productsFilterReducer = filterSlice.reducer;
