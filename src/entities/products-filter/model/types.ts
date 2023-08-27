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

export interface FilterState {
  brandFilter: FilterStateEnumTypeItem;
  colorFilter: FilterStateEnumTypeItem;
  priceFilter: FilterStatePriceItem;
  sizeFilter: number[];
}

export interface FilterEnumPayload {
  name: FilterEnumName;
  data: AttributePlainEnumValue;
}
