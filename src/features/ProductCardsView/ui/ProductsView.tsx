import React from "react";
import { type GridProps, Grid } from "@mui/material";
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
  const { data, error } = useProducts(categoryId, sort);

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
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
