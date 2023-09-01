import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ProductsSortSelect } from "../../../entities/products-sort-select";
import { ProductsFilter } from "../../../entities/products-filter";
import { ProductCardsView } from "../../../features/ProductCardsView";
import { ProductsSearch } from "../../../entities/products-search";

export function CategoryProductsWidget() {
  return (
    <Container maxWidth="lg">
      <ProductsSearch />
      <Grid container justifyContent="space-between" sx={{ marginTop: 3 }}>
        <Grid item sm={12} md={7}>
          <Typography variant="h3" color="primary">
            Текущая категория
          </Typography>
        </Grid>
        <Grid item sm={1} md={5}>
          <ProductsSortSelect />
        </Grid>
        <Grid item sm={1} md={1}>
          <ProductsFilter />
        </Grid>
        <Grid item sm={12} md={11}>
          <Box maxWidth={784} margin="auto">
            <ProductCardsView />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
