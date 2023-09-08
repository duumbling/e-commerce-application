import { useEffect, useState } from "react";
import { getCurrentCart } from "../../../entities/cart/api/cart";
import { getCartProductData } from "../lib/helpers";
import type { CartProductData } from "../../../features/CartProductView";
import { useAppSelector } from "../../../shared/model/hooks";

export function useFetchCartProducts() {
  const [isLoading, setIsLoading] = useState(false);

  const [carItems, setProducts] = useState<CartProductData[]>([]);

  const cartState = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      try {
        const cart = await getCurrentCart();
        const items = cart.lineItems.map(getCartProductData);
        setProducts(items);
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
