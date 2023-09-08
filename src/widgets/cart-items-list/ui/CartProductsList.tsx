import React from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useFetchCartProducts } from "../model/hooks";
import { CartProductView } from "../../../features/CartProductView";
import { ThemeColors } from "../../../shared/constants/colors";

export function CartProductsList() {
  const { isLoading, items } = useFetchCartProducts();

  return (
    <>
      <Stack spacing={2}>
        {items.map((item) => (
          <CartProductView key={item.id} itemData={item} />
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
