import { type ProductVariant as SdkVariant } from "@commercetools/platform-sdk";
import type { ProductVariant } from "../../../shared/types/product";

export interface ProductData {
  id: string;
  title: string;
  images: string[];
  price: number;
  allVariants: SdkVariant[];
  currentVariant: ProductVariant;
  description?: string;
  discountPrice?: number;
}

export interface ProductsFetchResult {
  isFetching: boolean;
  pagesCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  data: ProductData[];
  error: Error | null;
}
