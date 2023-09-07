import React from "react";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useFetchCartItems } from "../model/hooks";
import { CartItemView } from "../../../features/CartItemView";
import { ThemeColors } from "../../../shared/constants/colors";
import { Link } from "../../../shared/ui/Link";
import { Paths } from "../../../shared/constants/paths";

export function CartItemsList() {
  const { isLoading, products } = useFetchCartItems();

  return (
    <>
      {!isLoading && products.length === 0 && (
        <Grid
          container
          justifyContent="center"
          marginTop={5}
          textAlign="center"
        >
          <Grid item>
            <Stack spacing={4}>
              <Typography fontSize={{ md: 40, sm: 35, xs: 30 }}>
                Корзина пуста
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
