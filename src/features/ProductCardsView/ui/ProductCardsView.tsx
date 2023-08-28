import React, { useEffect } from "react";
import { type GridProps, Grid, Box, Typography } from "@mui/material";
import { ProductCard } from "../../../entities/product-card";
import { productsContainerProps } from "./style";
import { useFetchProducts } from "../model/hooks";
import { useAppDispatch } from "../../../shared/model/hooks";
import { updateAvailableFilterValues } from "../../../entities/products-filter";
import {
  getAvailableBrands,
  getAvailableColors,
  getAvailableSizes,
  getMinAndMaxPrices,
} from "../lib/helpers";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";

type ProductsViewProps = Pick<GridProps, "sx"> & {
  categoryId: string;
};

export function ProductCardsView({ categoryId, sx }: ProductsViewProps) {
  const { isLoading, data, error } = useFetchProducts(categoryId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    dispatch(
      updateAvailableFilterValues({
        brands: getAvailableBrands(data),
        colors: getAvailableColors(data),
      }),
    );
  }, [isLoading]);

  useEffect(() => {
    dispatch(
      updateAvailableFilterValues({
        sizes: getAvailableSizes(data),
        prices: getMinAndMaxPrices(data),
      }),
    );
  }, [data]);

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h3">Loading</Typography>
      </Box>
    );
  }

  return (
    <Grid {...productsContainerProps} sx={sx}>
      {data.map((product) => {
        return (
          <Grid key={product.id} item>
            <ProductCard
              title={product.title}
              image={product.images[0]}
              price={product.price}
              discountPrice={product.discountPrice}
            />
          </Grid>
        );
      })}
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity="error"
        autoHideDuration={2000}
        open={error !== null}
        message={`Ошибка: ${error?.message ?? ""}`}
      />
    </Grid>
  );
}
