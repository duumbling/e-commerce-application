import { type Cart } from "@commercetools/platform-sdk";
import { isUserAuthenticated } from "../../../shared/api";
import {
  anonymousApiRoot,
  customerDataApiRoot,
} from "../../../shared/api/apiRoot";

export const getActiveCart = async () => {
  const api = isUserAuthenticated() ? customerDataApiRoot : anonymousApiRoot;
  return await api().me().activeCart().get().execute();
};

export const createCart = async () => {
  const api = isUserAuthenticated() ? customerDataApiRoot : anonymousApiRoot;
  return await api()
    .me()
    .carts()
    .post({
      body: {
        currency: "RUB",
        country: "RU",
      },
    })
    .execute();
};

export const getCurrentCart = async (): Promise<Cart> => {
  try {
    const { body } = await getActiveCart();
    return body;
  } catch {
    const { body } = await createCart();
    return body;
  }
};

export const addProductToCart = async (
  cart: Cart,
  productId: string,
  variantId?: number,
): Promise<Cart> => {
  const api = isUserAuthenticated() ? customerDataApiRoot : anonymousApiRoot;

  const { body } = await api()
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        actions: [
          {
            action: "addLineItem",
            productId,
            variantId,
          },
        ],
        version: cart.version,
      },
    })
    .execute();
  return body;
};
