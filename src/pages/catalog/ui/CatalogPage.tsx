import React from "react";
import { CategoryProductsWidget } from "../../../widgets/category-products-widget/ui/CategoryProductsWidget";
import { Header } from "../../../shared/ui/Header";

export function CatalogPage() {
  return (
    <>
      <Header>Каталог</Header>
      <CategoryProductsWidget />
    </>
  );
}
