import React, { useEffect, useState } from "react";
import { ProductCardsView } from "../../../features/ProductCardsView";
import { Header } from "../../../shared/ui/Header";
import { apiRoot } from "../../../shared/api/apiRoot";
import { Box } from "@mui/material";
import { ProductsSortSelect } from "../../../entities/products-sort-select";
import { useAppSelector } from "../../../shared/model/hooks";

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
      <Box>
        <ProductsSortSelect />
      </Box>
      <Box maxWidth={784} margin="auto">
        <ProductCardsView categoryId={categoryId} sort={sortOption.value} />
      </Box>
    </>
  );
}
