import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { addProductToCart } from "../api/cart";
import { cartSlice } from "./slice";

interface Attributes {
  color: string;
  size: number;
}

interface CartHookResult {
  isLoading: boolean;
  isProductAdded: (productId: string) => boolean;
  addProduct: (
    productId: string,
    variantId: number,
    attributes: Attributes,
  ) => Promise<void>;
}

export function useCart(): CartHookResult {
  const [isLoading, setIsLoading] = useState(false);
  const cartState = useAppSelector((state) => state.cartReducer);

  const { updateItemsIds } = cartSlice.actions;

  const dispatch = useAppDispatch();

  const isProductAdded = (productId: string): boolean =>
    cartState.ids.filter((id) => id === productId).length > 0;

  const addProduct = async (
    productId: string,
    variantId: number,
    attributes: Attributes,
  ): Promise<void> => {
    setIsLoading(true);

    await addProductToCart(productId, variantId, attributes);

    dispatch(updateItemsIds(productId));

    setIsLoading(false);
  };

  return {
    isLoading,
    isProductAdded,
    addProduct,
  };
}
