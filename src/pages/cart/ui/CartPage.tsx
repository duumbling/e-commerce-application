import React from "react";
import { Header } from "../../../widgets/Header";
import { CartItemsList } from "../../../widgets/cart-items-list";
import { OrderSummary } from "../../../features/OrderSummary";
import { Box } from "@mui/material";

export function CartPage() {
  return (
    <div>
      <Header />
      <CartItemsList />
      <Box marginTop={5}>
        <OrderSummary />
      </Box>
    </div>
  );
}
