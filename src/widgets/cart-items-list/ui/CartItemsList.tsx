import React from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useFetchCartItems } from "../model/hooks";
import { CartItemView } from "../../../features/CartProductView";
import { ThemeColors } from "../../../shared/constants/colors";

export function CartItemsList() {
  const { isLoading, items } = useFetchCartItems();

  return (
    <>
      <Stack spacing={2}>
        {items.map((item) => (
          <CartItemView key={item.id} itemData={item} />
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
