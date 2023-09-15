import React from "react";
import { Header } from "../../../widgets/Header";
import { OrderSummary } from "../../../features/OrderSummary";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { CartProductsList } from "../../../widgets/cart-products-list";
import { DiscountCodeField } from "../../../features/DiscountCodeField";
import { useAppSelector } from "../../../shared/model/hooks";
import { ThemeColors } from "../../../shared/constants/colors";
import { Paths } from "../../../shared/constants/paths";
import { CartClearButton } from "../../../features/CartClearButton";

export function CartPage() {
  const { ids } = useAppSelector((state) => state.cartReducer);

  return (
    <>
      <Header />
      {ids.length === 0 && (
        <Grid
          container
          justifyContent="center"
          marginTop={5}
          textAlign="center"
        >
          <Grid item>
            <Stack spacing={4}>
              <Typography fontSize={{ md: 40, sm: 35, xs: 30 }}>
                В корзине пока пусто
              </Typography>
              <Link
                href={Paths.Catalog}
                color={ThemeColors.PRIMARY}
                sx={{
                  marginTop: 8,
                  fontSize: { md: 30, sm: 25, xs: 20 },
                }}
              >
                В каталог
              </Link>
            </Stack>
          </Grid>
        </Grid>
      )}
      {ids.length > 0 && (
        <>
          <Grid container justifyContent="right" marginTop={2}>
            <Grid item>
              <CartClearButton />
            </Grid>
          </Grid>
          <Box marginTop={3}>
            <CartProductsList />
          </Box>
          <DiscountCodeField marginTop={3} />
          <Box marginTop={5}>
            <OrderSummary />
          </Box>
        </>
      )}
    </>
  );
}
