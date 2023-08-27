import React, { useEffect, useState } from "react";
import { ProductCardsView } from "../../../features/ProductCardsView";
import { Header } from "../../../shared/ui/Header";
import { apiRoot } from "../../../shared/api/apiRoot";
import { Box, Container, Grid } from "@mui/material";
import { ProductsSortSelect } from "../../../entities/products-sort-select";
import { useAppSelector } from "../../../shared/model/hooks";
import { ProductsFilter } from "../../../entities/products-filter/ui/ProductsFilter";

export function CatalogPage() {
  const [categoryId, setCategoryId] = useState("");
  const sortOption = useAppSelector((state) => state.sortProductsReducer);

  useEffect(() => {
    void (async () => {
      const { body } = await apiRoot().categories().get().execute();
      const categories = body.results.filter(
        (value) => value.key === "sneakers",
      );
      if (categories.length >= 0) {
        setCategoryId(categories[0].id);
      }
    })();
  }, []);

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
              <ProductCardsView
                categoryId={categoryId}
                sort={sortOption.value}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
