import { type Cart } from "@commercetools/platform-sdk";
import { isUserAuthenticated } from "../../../shared/api";
import {
  anonymousApiRoot,
  customerDataApiRoot,
} from "../../../shared/api/apiRoot";

export const getCarts = async () => {
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

export const addProductToCart = async (
  productId: string,
  variantId?: number,
  cart?: Cart,
) => {
  const api = isUserAuthenticated() ? customerDataApiRoot : anonymousApiRoot;
  if (cart === undefined) {
    const createdCartResponse = await createCart();
    cart = createdCartResponse.body;
  }
  return await api()
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
};
