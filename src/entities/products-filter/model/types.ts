import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export type FilterEnumName = "brand" | "color" | "size";

interface FilterStateEnumTypeItem {
  name: FilterEnumName;
  values: AttributePlainEnumValue[];
}

export interface PriceValue {
  min: number;
  max: number;
}

export interface FilterValues {
  brands: AttributePlainEnumValue[];
  colors: AttributePlainEnumValue[];
  sizes: number[];
  prices: PriceValue;
}

export interface FilterState {
  brandFilter: FilterStateEnumTypeItem;
  colorFilter: FilterStateEnumTypeItem;
  priceFilter: PriceValue;
  sizeFilter: number[];
  availableFilterValues: FilterValues;
}

export interface FilterEnumPayload {
  name: FilterEnumName;
  data: AttributePlainEnumValue;
}
