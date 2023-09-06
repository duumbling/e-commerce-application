import { type Cart } from "@commercetools/platform-sdk";
import { isUserAuthenticated } from "../../../shared/api";
import {
  anonymousApiRoot,
  customerDataApiRoot,
} from "../../../shared/api/apiRoot";
import type { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

const getApiRoot = (): (() => ByProjectKeyRequestBuilder) =>
  isUserAuthenticated() ? customerDataApiRoot : anonymousApiRoot;

export const getActiveCart = async () => {
  const api = getApiRoot();
  return await api().me().activeCart().get().execute();
};

export const createCart = async () => {
  const api = getApiRoot();
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
  const api = getApiRoot();

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
