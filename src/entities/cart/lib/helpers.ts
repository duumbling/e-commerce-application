import type { LineItem } from "@commercetools/platform-sdk";

export const getCurrentLineItem = (items: LineItem[], id: string): LineItem =>
  items.filter((item) => item.id === id)[0];
