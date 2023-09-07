import React from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useFetchCartItems } from "../model/hooks";
import { CartItemView } from "../../../features/CartItemView";
import { ThemeColors } from "../../../shared/constants/colors";

export function CartItemsList() {
  const { isLoading, products } = useFetchCartItems();

  return (
    <>
      <Stack spacing={2}>
        {products.map(
          ({ title, image, price, discountPrice, id, color, size }) => (
            <CartItemView
              key={id}
              title={title}
              image={image}
              price={price}
              discountPrice={discountPrice}
              color={color}
              size={size}
            />
          ),
        )}
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
