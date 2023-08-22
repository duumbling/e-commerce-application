import React from "react";
import { type GridProps, Grid, Typography } from "@mui/material";
import { ProductCard } from "../../../entities/product-card";
import { productsContainerProps, rootStyle, titleStyle } from "./style";

export interface MockProductData {
  title: string;
  image: string;
  description: string;
  price: number;
  id: string | number;
}

type ProductsViewProps = Pick<GridProps, "sx"> & {
  title: string;
  products: MockProductData[];
  limit?: number;
};

export function ProductsView({
  title,
  products,
  sx,
  limit,
}: ProductsViewProps) {
  const productsData =
    limit !== undefined ? products.slice(0, limit) : products;
  return (
    <Grid container sx={{ ...rootStyle, ...sx }}>
      <Typography component="h2" sx={titleStyle}>
        {title}
      </Typography>
      <Grid {...productsContainerProps}>
        {productsData.map((product) => {
          return (
            <Grid key={product.id} item>
              <ProductCard {...product} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
