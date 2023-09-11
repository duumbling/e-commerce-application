import type { LineItem } from "@commercetools/platform-sdk";
import { getDiscountPrice, getPriceValue } from "../../../shared/api/product";
import type { CartProductData } from "../../../features/CartProductView";

export const getCartProductData = ({
  productId,
  name,
  price,
  variant,
  custom,
  quantity,
  totalPrice,
}: LineItem): CartProductData => {
  return {
    id: productId,
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
