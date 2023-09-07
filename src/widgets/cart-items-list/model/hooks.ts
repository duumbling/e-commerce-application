import { useEffect, useState } from "react";
import { getCurrentCart } from "../../../entities/cart/api/cart";
import { getCartProductData } from "../lib/helpers";
import type { CartItemData } from "../../../features/CartItemView";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { cartSlice } from "../../../entities/cart";
import { getPriceValue } from "../../../shared/api/product";

export function useFetchCartItems() {
  const [isLoading, setIsLoading] = useState(false);

  const [carItems, setProducts] = useState<CartItemData[]>([]);

  const cartState = useAppSelector((state) => state.cartReducer);

  const { updateTotalPrice } = cartSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      try {
        const cart = await getCurrentCart();
        const items = cart.lineItems.map(getCartProductData);
        setProducts(items);
        dispatch(updateTotalPrice(getPriceValue(cart.totalPrice)));
      } catch {
        // do nothing
      }

      setIsLoading(false);
    })();
  }, [cartState]);

  return {
    isLoading,
    items: carItems,
  };
}
