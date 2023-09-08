import type { ProductData } from "../../../shared/types/product";

export type CartProductData = Omit<
  ProductData,
  "description" | "images" | "allVariants"
> & {
  image: string;
  color: string;
  size: number;
};
