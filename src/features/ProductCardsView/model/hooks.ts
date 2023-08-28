import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import { useAppSelector } from "../../../shared/model/hooks";
import { getAllProductsByCategoryId } from "../api/products";

export function useFetchProducts(categoryId: string): ProductsFetchResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

  const { brandFilter, colorFilter, priceFilter, sizeFilter } = useAppSelector(
    (state) => state.productsFilterReducer,
  );

  const sortState = useAppSelector((state) => state.sortProductsReducer);

  useEffect(() => {
    void (async () => {
      try {
        const productsData = await getAllProductsByCategoryId(
          categoryId,
          {
            brandFilter: brandFilter.values,
            colorFilter: colorFilter.values,
            priceFilter,
            sizeFilter,
          },
          sortState.value,
        );
        setProducts(productsData);
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setError(error);
      }
      setIsLoading(false);
    })();
  }, [
    categoryId,
    sortState,
    brandFilter,
    colorFilter,
    priceFilter,
    sizeFilter,
  ]);

  return {
    isLoading,
    data: products,
    error,
  };
}
