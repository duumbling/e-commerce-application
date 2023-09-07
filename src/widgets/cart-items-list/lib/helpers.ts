import type { LineItem } from "@commercetools/platform-sdk";
import { getDiscountPrice, getPriceValue } from "../../../shared/api/product";
import type { CartItemData } from "../../../features/CartItemView";

export const getCartProductData = ({
  id,
  name,
  price,
  variant,
  custom,
  quantity,
  totalPrice,
}: LineItem): CartItemData => {
  return {
    id,
    title: name["ru-RU"],
    image: variant.images !== undefined ? variant.images[0].url : "",
    price: getPriceValue(price.value),
    discountPrice: getDiscountPrice(price),
    totalPrice: getPriceValue(totalPrice),
    color: custom?.fields.color,
    size: custom?.fields.size,
    quantity,
  };
};
