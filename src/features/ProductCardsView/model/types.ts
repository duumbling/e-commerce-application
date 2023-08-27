import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";

export interface ProductData {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
}

export interface Filters {
  brandFilter: AttributePlainEnumValue[];
  colorFilter: AttributePlainEnumValue[];
}

export interface ProductsFetchResult {
  isLoading: boolean;
  data: ProductData[];
  error: Error | null;
}
