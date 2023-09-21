import type {
  DiscountedLineItemPriceForQuantity,
  LineItem,
} from "@commercetools/platform-sdk";
import { getDiscountPrice, getPriceValue } from "../../../shared/api/product";
import type { CartProductData } from "../../../features/CartProductView";

const getCartProductDiscountedPrice = (
  prices: DiscountedLineItemPriceForQuantity[],
): number | undefined => {
  return getPriceValue(prices[0].discountedPrice.value);
};

export const getCartProductData = ({
  productId,
  name,
  price,
  discountedPricePerQuantity,
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
    discountPrice:
      discountedPricePerQuantity.length > 0
        ? getCartProductDiscountedPrice(discountedPricePerQuantity)
        : getDiscountPrice(price),
    totalPrice: getPriceValue(totalPrice),
    color: custom?.fields.color,
    size: custom?.fields.size,
    quantity,
  };
};
