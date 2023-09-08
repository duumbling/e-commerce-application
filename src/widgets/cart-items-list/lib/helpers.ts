import type { LineItem } from "@commercetools/platform-sdk";
import type { CartProductData } from "../model/types";
import { getDiscountPrice, getPriceValue } from "../../../shared/api/product";

export const getCartProductData = ({
  id,
  name,
  price,
  variant,
  custom,
}: LineItem): CartProductData => {
  return {
    id,
    title: name["ru-RU"],
    image: variant.images !== undefined ? variant.images[0].url : "",
    price: getPriceValue(price.value),
    discountPrice: getDiscountPrice(price),
    color: custom?.fields.color,
    size: custom?.fields.size,
  };
};
