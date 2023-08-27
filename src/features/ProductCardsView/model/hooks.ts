import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import { useAppSelector } from "../../../shared/model/hooks";
import { getAllProductsByCategoryId } from "../api/products";

export function useProducts(
  categoryId: string,
  sort?: string,
): ProductsFetchResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

  const filterState = useAppSelector((state) => state.productsFilterReducer);

  useEffect(() => {
    void (async () => {
      try {
        const productsData = await getAllProductsByCategoryId(
          categoryId,
          {
            brandFilter: filterState.brandFilter.values,
            colorFilter: filterState.colorFilter.values,
          },
          sort,
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
  }, [categoryId, sort, filterState]);

  return {
    isLoading,
    data: products,
    error,
  };
}
