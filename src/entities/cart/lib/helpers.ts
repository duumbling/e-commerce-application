import type { LineItem } from "@commercetools/platform-sdk";

export const getCurrentLineItem = (
  items: LineItem[],
  productId: string,
): LineItem => items.filter((item) => item.productId === productId)[0];
