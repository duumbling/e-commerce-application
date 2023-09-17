import { apiRoot } from "../../../shared/api/apiRoot";
import { getCurrentLineItem } from "../lib/helpers";
import {
  addProductToCart,
  changeCartProductQuantity,
  getCurrentCart,
  removeAllCartProducts,
  removeProductFromCart,
} from "./cart";

test("getCurrentCart", async () => {
  const data = await getCurrentCart();
  expect(data).toHaveProperty("lineItems");
});

test("addProductToCard work properly", async () => {
  const {
    body: { results },
  } = await apiRoot().productProjections().search().get().execute();
  const id = results[0].id;

  const newCart = await addProductToCart(id, 1, {
    color: "RED",
    size: 40,
  });
  const ids = newCart.lineItems
    .filter((item) => item.productId === id)
    .map((value) => value.productId);
  expect(ids).toContain(id);
});

test("removeFromCart work properly", async () => {
  const {
    body: { results },
  } = await apiRoot().productProjections().search().get().execute();
  const id = results[0].id;

  await addProductToCart(id, 1, {
    color: "RED",
    size: 40,
  });
  const newCart = await removeProductFromCart(id);
  const ids = newCart.lineItems
    .filter((item) => item.productId === id)
    .map((value) => value.productId);
  expect(ids).not.toContain(id);
});

test("removeAllProductsFromCart work properly", async () => {
  const {
    body: { results },
  } = await apiRoot().productProjections().search().get().execute();
  const productIds = results.map(({ id }) => id).slice(0, 5);

  for (const id of productIds) {
    await addProductToCart(id, 1, {
      color: "RED",
      size: 40,
    });
  }

  const newCart = await removeAllCartProducts();
  const ids = newCart.lineItems
    .filter((item) => productIds.includes(item.productId))
    .map((value) => value.productId);
  ids.forEach((id) => {
    expect(ids).not.toContain(id);
  });
});

test("changeProductQuantity add work properly", async () => {
  const {
    body: { results },
  } = await apiRoot().productProjections().search().get().execute();
  const { id } = results[0];
  const cart = await addProductToCart(id, 1, {
    color: "RED",
    size: 40,
  });
  const { quantity: quantityBefore } = getCurrentLineItem(cart.lineItems, id);

  const { lineItems } = await changeCartProductQuantity(id, "add");

  const { quantity } = getCurrentLineItem(lineItems, id);
  expect(quantity).toBe(quantityBefore + 1);
});

test("changeProductQuantity remove work properly", async () => {
  const {
    body: { results },
  } = await apiRoot().productProjections().search().get().execute();
  const { id } = results[0];
  await addProductToCart(id, 1, {
    color: "RED",
    size: 40,
  });
  const cart = await changeCartProductQuantity(id, "add");
  const { quantity: quantityBefore } = getCurrentLineItem(cart.lineItems, id);

  const { lineItems } = await changeCartProductQuantity(id, "remove");

  const { quantity } = getCurrentLineItem(lineItems, id);
  expect(quantity).toBe(quantityBefore - 1);
});
