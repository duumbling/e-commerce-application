import type { ProductData } from "../../../shared/types/product";

export type CartItemData = Omit<
  ProductData,
  "description" | "images" | "allVariants"
> & {
  image: string;
  color: string;
  size: number;
  totalPrice: number;
  quantity: number;
};
