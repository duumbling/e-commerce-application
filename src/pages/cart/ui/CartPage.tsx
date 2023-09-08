import React from "react";
import { Header } from "../../../widgets/Header";
import { CartProductsList } from "../../../widgets/cart-products-list";

export function CartPage() {
  return (
    <div>
      <Header />
      <CartProductsList />
    </div>
  );
}
