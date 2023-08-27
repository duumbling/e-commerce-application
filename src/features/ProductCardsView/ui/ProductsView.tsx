import React from "react";
import { type GridProps, Grid, Box, Typography } from "@mui/material";
import { ProductCard } from "../../../entities/product-card";
import { productsContainerProps } from "./style";
import { useProducts } from "../model/hooks";

type ProductsViewProps = Pick<GridProps, "sx"> & {
  categoryId: string;
  sort?: string;
  productBrand?: string;
  productColor?: string;
  productSize?: string;
};

export function ProductCardsView({ categoryId, sx, sort }: ProductsViewProps) {
  const { isLoading, data, error } = useProducts(categoryId, sort);

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h3">Loading</Typography>
      </Box>
    );
  }

  if (error !== null) {
    // TODO: do something when there is error while fetching products data
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
    </Grid>
  );
}
