import React from "react";
import { Header } from "../../../widgets/Header";
import { CartItemsList } from "../../../widgets/cart-items-list";

export function CartPage() {
  return (
    <div>
      <Header />
      <CartItemsList />
    </div>
  );
}
