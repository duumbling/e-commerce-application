import { type ProductData } from "../../../shared/types/product";

export const initialState: ProductData = {
  id: "0",
  title: "",
  images: [],
  price: 0,
  allVariants: [],
  description: "",
  discountPrice: undefined,
};
