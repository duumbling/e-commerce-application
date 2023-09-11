import React from "react";
import { Header } from "../../../widgets/Header";
import { OrderSummary } from "../../../features/OrderSummary";
import { Box } from "@mui/material";
import { CartProductsList } from "../../../widgets/cart-products-list";
import { DiscountCodeField } from "../../../features/DiscountCodeField";

export function CartPage() {
  return (
    <div>
      <Header />
      <CartProductsList />
      <DiscountCodeField marginTop={3} />
      <Box marginTop={5}>
        <OrderSummary />
      </Box>
    </div>
  );
}
