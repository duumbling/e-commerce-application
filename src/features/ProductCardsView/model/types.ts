import { type ProductVariant } from "@commercetools/platform-sdk";

export interface ProductData {
  id: string;
  title: string;
  images: string[];
  price: number;
  allVariants: ProductVariant[];
  description?: string;
  discountPrice?: number;
}

export interface ProductsFetchResult {
  isFetching: boolean;
  pagesCount: number;
  data: ProductData[];
  error: Error | null;
}
