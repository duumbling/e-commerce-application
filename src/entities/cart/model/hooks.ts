import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import {
  addDiscountCode,
  addProductToCart,
  isDiscountCodeExists,
  removeAllCartProducts,
  removeProductFromCart,
} from "../api/cart";
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
  removeProduct: (productId: string) => Promise<void>;
  removeAllProducts: () => Promise<void>;
  applyDiscountCode: (code: string) => Promise<boolean>;
}

export function useCart(): CartHookResult {
  const [isLoading, setIsLoading] = useState(false);
  const { ids } = useAppSelector((state) => state.cartReducer);
  const { updateCartState } = cartSlice.actions;
  const dispatch = useAppDispatch();

  const isProductAdded = (productId: string): boolean =>
    ids.filter((id) => id === productId).length > 0;

  const addProduct = async (
    productId: string,
    variantId: number,
    attributes: Attributes,
  ): Promise<void> => {
    setIsLoading(true);

    const cart = await addProductToCart(productId, variantId, attributes);
    dispatch(updateCartState(cart));

    setIsLoading(false);
  };

  const removeProduct = async (productId: string): Promise<void> => {
    setIsLoading(true);

    const cart = await removeProductFromCart(productId);
    dispatch(updateCartState(cart));

    setIsLoading(false);
  };

  const applyDiscountCode = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    const isCodeExists = await isDiscountCodeExists(code);

    if (isCodeExists) {
      const cart = await addDiscountCode(code);
      dispatch(updateCartState(cart));
    }

    setIsLoading(false);
    return isCodeExists;
  };

  const removeAllProducts = async (): Promise<void> => {
    setIsLoading(true);

    const cart = await removeAllCartProducts();
    dispatch(updateCartState(cart));

    setIsLoading(false);
  };

  return {
    isLoading,
    isProductAdded,
    addProduct,
    removeProduct,
    applyDiscountCode,
    removeAllProducts,
  };
}
