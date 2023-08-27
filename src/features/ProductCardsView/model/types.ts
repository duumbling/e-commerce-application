import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export interface ProductData {
  id: string;
  title: string;
  images: string[];
  price: number;
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
  data: ProductData[];
  error: Error | null;
}
