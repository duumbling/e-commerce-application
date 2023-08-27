import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export type FilterEnumName = "brand" | "color" | "size";

interface FilterStateItem {
  name: FilterEnumName;
  values: AttributePlainEnumValue[];
}

export interface FilterState {
  brandFilter: FilterStateItem;
  colorFilter: FilterStateItem;
  sizeFilter: FilterStateItem;
}

export interface FilterEnumPayload {
  name: FilterEnumName;
  data: AttributePlainEnumValue;
}
