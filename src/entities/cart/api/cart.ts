import { type Cart } from "@commercetools/platform-sdk";
import { isUserAuthenticated } from "../../../shared/api";
import {
  anonymousApiRoot,
  customerDataApiRoot,
} from "../../../shared/api/apiRoot";
import type { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

const getApiRoot = (): (() => ByProjectKeyRequestBuilder) =>
  isUserAuthenticated() ? customerDataApiRoot : anonymousApiRoot;

export const getActiveCart = async (): Promise<Cart> => {
  const api = getApiRoot();
  const { body } = await api().me().activeCart().get().execute();
  return body;
};

export const createCart = async (): Promise<Cart> => {
  const api = getApiRoot();

  const { body } = await api()
    .me()
    .carts()
    .post({
      body: {
        currency: "RUB",
        country: "RU",
      },
    })
    .execute();

  return body;
};

export const getCurrentCart = async (): Promise<Cart> => {
  try {
    const cart = await getActiveCart();
    return cart;
  } catch {
    return await createCart();
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

export const removeLineItemFromCart = async (
  lineItemId: string,
): Promise<Cart> => {
  const api = getApiRoot();

  const { id, version } = await getActiveCart();

  const { body } = await api()
    .me()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        actions: [
          {
            action: "removeLineItem",
            lineItemId,
          },
        ],
        version,
      },
    })
    .execute();

  return body;
};

export const removeCart = async (): Promise<Cart> => {
  const { id, version } = await getActiveCart();

  const api = getApiRoot();

  const { body } = await api()
    .me()
    .carts()
    .withId({ ID: id })
    .delete({
      queryArgs: {
        version,
      },
    })
    .execute();
  return body;
};
