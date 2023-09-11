import type { Cart, LineItem } from "@commercetools/platform-sdk";
import { getDiscountPrice, getPriceValue } from "../../../shared/api/product";

export const getCurrentLineItem = (
  items: LineItem[],
  productId: string,
): LineItem => items.filter((item) => item.productId === productId)[0];

export const getCartTotalPrice = (cart: Cart): number => {
  return cart.lineItems.reduce(
    (acc, curr) => acc + getPriceValue(curr.price.value) * curr.quantity,
    0,
  );
};

export const getCartDiscountPrice = (cart: Cart): number => {
  return cart.lineItems.reduce((acc, curr) => {
    const discountPrice =
      curr.discountedPricePerQuantity.length > 0
        ? getPriceValue(
            curr.discountedPricePerQuantity[0].discountedPrice.value,
          )
        : getDiscountPrice(curr.price) ?? 0;

    if (discountPrice === 0) {
      return discountPrice;
    }
    const price = getPriceValue(curr.price.value);
    return acc + (price - discountPrice) * curr.quantity;
  }, 0);
};
