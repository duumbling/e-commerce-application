import React from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useFetchCartProducts } from "../model/hooks";
import { CartProductView } from "../../../features/CartProductView";
import { ThemeColors } from "../../../shared/constants/colors";

export function CartProductsList() {
  const { isLoading, cartProducts } = useFetchCartProducts();

  return (
    <>
      <Stack spacing={2}>
        {cartProducts.map((product) => (
          <CartProductView key={product.id} data={product} />
        ))}
      </Stack>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color={ThemeColors.PRIMARY} />
      </Backdrop>
    </>
  );
}
