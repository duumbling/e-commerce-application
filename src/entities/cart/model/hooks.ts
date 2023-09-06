import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { addProductToCart, getCurrentCart } from "../api/cart";
import { cartSlice } from "./slice";

interface CartHookResult {
  isLoading: boolean;
  resetCart: () => void;
  isProductAdded: (productId: string) => boolean;
  addProduct: (productId: string, variantId?: number) => Promise<void>;
}

export function useCart(): CartHookResult {
  const [isLoading, setIsLoading] = useState(false);
  const cartState = useAppSelector((state) => state.cartReducer);

  const { setCurrentCart, resetCurrentCart } = cartSlice.actions;

  const dispatch = useAppDispatch();

  const resetCart = (): void => {
    dispatch(resetCurrentCart());
  };

  const isProductAdded = (productId: string): boolean => {
    const filteredItems = cartState?.current?.lineItems.filter(
      (item) => item.productId === productId,
    );
    return (filteredItems !== undefined && filteredItems.length > 0) ?? false;
  };

  const addProduct = async (
    productId: string,
    variantId?: number,
  ): Promise<void> => {
    setIsLoading(true);

    const currentCart = cartState.current ?? (await getCurrentCart());

    const newCart = await addProductToCart(currentCart, productId, variantId);

    dispatch(setCurrentCart(newCart));
    console.log(newCart);

    setIsLoading(false);
  };

  return {
    isLoading,
    resetCart,
    isProductAdded,
    addProduct,
  };
}
