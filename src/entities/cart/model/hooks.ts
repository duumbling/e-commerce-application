import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import {
  addDiscountCode,
  addProductToCart,
  isDiscountCodeExists,
  removeProductFromCart,
} from "../api/cart";
import { cartSlice } from "./slice";
import { getPriceValue } from "../../../shared/api/product";

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
  applyDiscountCode: (code: string) => Promise<boolean>;
}

export function useCart(): CartHookResult {
  const [isLoading, setIsLoading] = useState(false);
  const cartState = useAppSelector((state) => state.cartReducer);
  const { updateItemsIds, updateTotalPrice } = cartSlice.actions;
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

  const removeProduct = async (productId: string): Promise<void> => {
    setIsLoading(true);

    await removeProductFromCart(productId);
    dispatch(updateItemsIds(productId));

    setIsLoading(false);
  };

  const applyDiscountCode = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    const isCodeExists = await isDiscountCodeExists(code);

    if (isCodeExists) {
      const cart = await addDiscountCode(code);
      const totalPriceValue = getPriceValue(cart.totalPrice);
      dispatch(updateTotalPrice(totalPriceValue));
    }

    setIsLoading(false);
    return isCodeExists;
  };

  return {
    isLoading,
    isProductAdded,
    addProduct,
    removeProduct,
    applyDiscountCode,
  };
}
