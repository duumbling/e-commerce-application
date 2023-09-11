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
    const discountedPrice =
      curr.discountedPricePerQuantity.length > 0
        ? getPriceValue(
            curr.discountedPricePerQuantity[0].discountedPrice.value,
          )
        : getDiscountPrice(curr.price);
    return acc + (discountedPrice ?? 0) * curr.quantity;
  }, 0);
};
