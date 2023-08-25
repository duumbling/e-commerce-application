import React, { useEffect, useState } from "react";
import { type GridProps, Grid } from "@mui/material";
import { ProductCard } from "../../../entities/product-card";
import { productsContainerProps } from "./style";
import { type ProductData, type SortType } from "../model/types";
import { getAllProductsByCategoryId } from "../api/products";

type ProductsViewProps = Pick<GridProps, "sx"> & {
  categoryId: string;
  sort?: SortType;
  limit?: number;
};

export function ProductCardsView({
  categoryId,
  sx,
  limit,
  sort = "NAME",
}: ProductsViewProps) {
  const [products, setProducts] = useState<ProductData[]>([]);

  const updateProductsData = async () => {
    try {
      const productsData = await getAllProductsByCategoryId(categoryId, sort);
      setProducts(
        limit !== undefined ? productsData.slice(0, limit) : productsData,
      );
    } catch (error) {
      console.log(error);
      // TODO: make something when there are any errors while fetching products data
    }
  };

  useEffect(() => {
    void updateProductsData();
  }, [categoryId]);

  return (
    <Grid {...productsContainerProps}>
      {products.map((product) => {
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
