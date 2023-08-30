import React from "react";
import { ProductCardsView } from "../../../features/ProductCardsView";
import { Header } from "../../../shared/ui/Header";
import { Box, Container, Grid } from "@mui/material";
import { ProductsSortSelect } from "../../../entities/products-sort-select";
import { ProductsFilter } from "../../../entities/products-filter/ui/ProductsFilter";

export function CatalogPage() {
  return (
    <>
      <Header>Каталог</Header>
      <ProductsSortSelect />
      <Container maxWidth="lg">
        <Grid container columnSpacing={8} justifyContent="space-between">
          <Grid item>
            <ProductsFilter />
          </Grid>
          <Grid item>
            <Box maxWidth={784} margin="auto">
              <ProductCardsView categoryId="" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
