import React from "react";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useFetchCartProducts } from "../model/hooks";
import { CartProductView } from "../../../features/CartProductView";
import { ThemeColors } from "../../../shared/constants/colors";
import { Paths } from "../../../shared/constants/paths";
import { Link } from "../../../shared/ui/Link";

export function CartProductsList() {
  const { isLoading, cartProducts } = useFetchCartProducts();

  return (
    <>
      {!isLoading && cartProducts.length === 0 && (
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
      {cartProducts.length > 0 && (
        <Stack spacing={2}>
          {cartProducts.map((product) => (
            <CartProductView key={product.id} data={product} />
          ))}
        </Stack>
      )}
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color={ThemeColors.PRIMARY} />
      </Backdrop>
    </>
  );
}
