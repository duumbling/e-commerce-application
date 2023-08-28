import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type FilterStatePriceItem,
  type FilterEnumPayload,
  type FilterState,
  type AvailableFilterValuePayload,
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

const isArrayOfStrings = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((value) => typeof value === "string")
  );
};

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
    updateAvailableFilterValues(
      state,
      { payload: { name, value } }: PayloadAction<AvailableFilterValuePayload>,
    ) {
      if (!Array.isArray(value)) {
        state.availableFilterValues.prices = value;
      } else if (!isArrayOfStrings(value)) {
        state.availableFilterValues.sizes = value;
      } else {
        switch (name) {
          case "brand":
            state.availableFilterValues.brands = value;
            break;
          case "color":
            state.availableFilterValues.colors = value;
            break;
          default:
            return state;
        }
      }
    },
  },
});

export const productsFilterReducer = filterSlice.reducer;
