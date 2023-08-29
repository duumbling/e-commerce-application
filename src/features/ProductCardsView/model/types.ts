import {
  type ProductVariant,
  type AttributePlainEnumValue,
} from "@commercetools/platform-sdk";

export interface ProductData {
  id: string;
  title: string;
  images: string[];
  price: number;
  allVariants: ProductVariant[];
  description?: string;
  discountPrice?: number;
}

export interface Filters {
  brandFilter: AttributePlainEnumValue[];
  colorFilter: AttributePlainEnumValue[];
  priceFilter: { min: number; max: number };
  sizeFilter: number[];
}

export interface ProductsFetchResult {
  isLoading: boolean;
  isFetching: boolean;
  data: ProductData[];
  error: Error | null;
}
