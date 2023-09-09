import React from "react";
import { Header } from "../../../widgets/Header";
import { OrderSummary } from "../../../features/OrderSummary";
import { Box } from "@mui/material";
import { CartProductsList } from "../../../widgets/cart-products-list";

export function CartPage() {
  return (
    <div>
      <Header />
      <CartProductsList />
      <Box marginTop={5}>
        <OrderSummary />
      </Box>
      <CartProductsList />
    </div>
  );
}
