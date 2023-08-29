import { type ProductVariant } from "@commercetools/platform-sdk";
import { type PriceValue } from "../../../entities/products-filter";

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
  brand: string[];
  color: string[];
  size: string[];
  price: PriceValue;
}

export interface ProductsFetchResult {
  isLoading: boolean;
  data: ProductData[];
  error: Error | null;
}
