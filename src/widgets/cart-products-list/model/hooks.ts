import { useEffect, useState } from "react";
import { getCurrentCart } from "../../../entities/cart/api/cart";
import { getCartProductData } from "../lib/helpers";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { cartSlice } from "../../../entities/cart";
import { getPriceValue } from "../../../shared/api/product";
import type { CartProductData } from "../../../features/CartProductView";

export function useFetchCartProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProductData[]>([]);
  const cartState = useAppSelector((state) => state.cartReducer);

  const { updateTotalPrice } = cartSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const cart = await getCurrentCart();
      const products = cart.lineItems.map(getCartProductData);
      const totalPriceValue = getPriceValue(cart.totalPrice);

      dispatch(updateTotalPrice(totalPriceValue));

      setCartProducts(products);
      setIsLoading(false);
    })();
  }, [cartState]);

  return {
    isLoading,
    cartProducts,
  };
}
