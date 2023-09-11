import { useEffect, useState } from "react";
import { getCurrentCart } from "../../../entities/cart/api/cart";
import { getCartProductData } from "../lib/helpers";
import { useAppSelector } from "../../../shared/model/hooks";
import type { CartProductData } from "../../../features/CartProductView";

export function useFetchCartProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const { ids } = useAppSelector((state) => state.cartReducer);
  const [cartProducts, setCartProducts] = useState<CartProductData[]>([]);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const cart = await getCurrentCart();
      const products = cart.lineItems.map(getCartProductData);

      setCartProducts(products);
      setIsLoading(false);
    })();
  }, [ids]);

  return {
    isLoading,
    cartProducts,
  };
}
