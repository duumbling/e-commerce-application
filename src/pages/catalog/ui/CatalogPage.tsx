import React from "react";
import { Header } from "../../../shared/ui/Header";
import { CategoryProductsWidget } from "../../../widgets/category-products-widget/ui/CategoryProductsWidget";

export function CatalogPage() {
  return (
    <>
      <Header>Каталог</Header>
      <CategoryProductsWidget />
    </>
  );
}
