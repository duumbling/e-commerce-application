import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export interface PriceValue {
  min: number;
  max: number;
}

export interface FilterState {
  brands: AttributePlainEnumValue[];
  colors: AttributePlainEnumValue[];
  sizes: number[];
  prices: PriceValue;
}

export enum FilterParamNames {
  BRAND = "brand",
  COLOR = "color",
  SIZE = "size",
  PRICE_MIN = "price_min",
  PRICE_MAX = "price_max",
}
