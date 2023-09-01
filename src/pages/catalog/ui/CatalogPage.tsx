import React from "react";
import { CategoryProductsWidget } from "../../../widgets/category-products-widget/ui/CategoryProductsWidget";
import { Grid } from "@mui/material";
import { Breadcrumbs } from "../../../features/Breadcrumbs";
import { ProductsSearch } from "../../../entities/products-search";

export function CatalogPage() {
  return (
    <>
      <Grid
        container
        justifyContent={{ md: "space-between", sm: "space-around" }}
        marginTop={2}
      >
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid item md={4} sm={4}>
          <ProductsSearch />
        </Grid>
      </Grid>
      <CategoryProductsWidget />
    </>
  );
}
