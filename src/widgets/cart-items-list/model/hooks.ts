import { useEffect, useState } from "react";
import { getCurrentCart } from "../../../entities/cart/api/cart";
import { getCartProductData } from "../lib/helpers";
import type { CartItemData } from "../../../features/CartItemView";
import { useAppSelector } from "../../../shared/model/hooks";

export function useFetchCartItems() {
  const [isLoading, setIsLoading] = useState(false);

  const [carItems, setProducts] = useState<CartItemData[]>([]);

  const { ids } = useAppSelector((state) => state.cartReducer);

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
  }, [ids]);

  return {
    isLoading,
    items: carItems,
  };
}
