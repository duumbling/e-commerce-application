import React from "react";
import { CategoryProductsWidget } from "../../../widgets/category-products-widget/ui/CategoryProductsWidget";
import { Grid } from "@mui/material";
import { Breadcrumbs } from "../../../features/Breadcrumbs";
import { ProductsSearch } from "../../../entities/products-search";
import { Header } from "../../../widgets/Header";

export function CatalogPage() {
  return (
    <>
      <Header />
      <Grid
        container
        justifyContent={{
          md: "space-between",
          sm: "center",
          xs: "center",
        }}
        marginTop={2}
      >
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid
          item
          md={4}
          sm={12}
          xs={10}
          marginTop={{ xs: 2 }}
          marginLeft={{ xs: 2, sm: 2 }}
        >
          <ProductsSearch />
        </Grid>
      </Grid>
      <CategoryProductsWidget />
    </>
  );
}
