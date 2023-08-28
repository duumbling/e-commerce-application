import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export type FilterEnumName = "brand" | "color" | "size";

interface FilterStateEnumTypeItem {
  name: FilterEnumName;
  values: AttributePlainEnumValue[];
}

export interface FilterStatePriceItem {
  min: number;
  max: number;
}

export interface FilterValues {
  brands: string[];
  colors: string[];
  sizes: number[];
  prices: FilterStatePriceItem;
}

export interface FilterState {
  brandFilter: FilterStateEnumTypeItem;
  colorFilter: FilterStateEnumTypeItem;
  priceFilter: FilterStatePriceItem;
  sizeFilter: number[];
  availableFilterValues: FilterValues;
}

export interface FilterEnumPayload {
  name: FilterEnumName;
  data: AttributePlainEnumValue;
}

export interface AvailableFilterValuePayload {
  name: "brand" | "color" | "size" | "price";
  value: string[] | number[] | FilterStatePriceItem;
}
