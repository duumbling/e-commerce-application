import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type PriceValue,
  type FilterEnumPayload,
  type FilterState,
  type FilterValues,
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
  availableFilterValues: {
    brands: [],
    colors: [],
    sizes: [],
    prices: { min: 0, max: 0 },
  },
};

const getUpdatedFilterEnumValueArray = (
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
          state.brandFilter.values = getUpdatedFilterEnumValueArray(
            state.brandFilter.values,
            data,
          );
          break;
        case state.colorFilter.name:
          state.colorFilter.values = getUpdatedFilterEnumValueArray(
            state.colorFilter.values,
            data,
          );
          break;
        default:
          return state;
      }
    },

    updatePriceFilter(state, { payload }: PayloadAction<PriceValue>) {
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

    updateAvailableFilterValues(
      state,
      { payload }: PayloadAction<Partial<FilterValues>>,
    ) {
      if (payload.brands !== undefined) {
        state.availableFilterValues.brands = payload.brands;
      }
      if (payload.colors !== undefined) {
        state.availableFilterValues.colors = payload.colors;
      }
      if (payload.prices !== undefined) {
        state.availableFilterValues.prices = payload.prices;
      }
      if (payload.sizes !== undefined) {
        state.availableFilterValues.sizes = payload.sizes;
      }
    },
  },
});

export const productsFilterReducer = filterSlice.reducer;

export const { updateAvailableFilterValues } = filterSlice.actions;
