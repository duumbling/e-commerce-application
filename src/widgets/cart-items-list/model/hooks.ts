import { useEffect, useState } from "react";
import { getCurrentCart } from "../../../entities/cart/api/cart";
import type { CartProductData } from "./types";
import { getCartProductData } from "../lib/helpers";

export function useFetchCartItems() {
  const [isLoading, setIsLoading] = useState(false);

  const [carItems, setProducts] = useState<CartProductData[]>([]);

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
  }, []);

  return {
    isLoading,
    products: carItems,
  };
}
