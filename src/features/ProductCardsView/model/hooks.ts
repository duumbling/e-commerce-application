import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import {
  useAppSelector,
  useCustomSearchParams,
} from "../../../shared/model/hooks";
import { getAllProductsByCategoryId } from "../api/products";
import { FilterParamNames } from "../../../entities/products-filter/model/types";

export function useFetchProducts(categoryId: string): ProductsFetchResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

  const sortState = useAppSelector((state) => state.sortProductsReducer);

  const { searchParams } = useCustomSearchParams();

  useEffect(() => {
    void (async () => {
      try {
        const productsData = await getAllProductsByCategoryId(
          categoryId,
          {
            brand: searchParams.getAll(FilterParamNames.BRAND),
            color: searchParams.getAll(FilterParamNames.COLOR),
            size: searchParams.getAll(FilterParamNames.SIZE),
            price: {
              min: Number(searchParams.get(FilterParamNames.PRICE_MIN)),
              max: Number(searchParams.get(FilterParamNames.PRICE_MAX)),
            },
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
  }, [categoryId, sortState, searchParams]);

  return {
    isLoading,
    data: products,
    error,
  };
}
