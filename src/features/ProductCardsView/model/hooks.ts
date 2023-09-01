import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import { useAppSelector } from "../../../shared/model/hooks";
import { getAllProductsByCategoryId } from "../api/products";
import { useSearchParams } from "react-router-dom";
import { getSearchKeyword } from "../lib/helpers";

export function useFetchProducts(categoryId: string): ProductsFetchResult {
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

  const [searchParams] = useSearchParams();

  const searchKeywordsState = useAppSelector(
    (state) => state.searchKeywordsReducer,
  );

  const { brandFilter, colorFilter, priceFilter, sizeFilter } = useAppSelector(
    (state) => state.productsFilterReducer,
  );

  const sortState = useAppSelector((state) => state.sortProductsReducer);

  useEffect(() => {
    void (async () => {
      setIsFetching(true);
      try {
        const searchValue = getSearchKeyword(
          searchKeywordsState.keywords,
          searchParams.get("text")?.toLowerCase() ?? "",
        );

        const productsData = await getAllProductsByCategoryId(
          categoryId,
          {
            brandFilter: brandFilter.values,
            colorFilter: colorFilter.values,
            priceFilter,
            sizeFilter,
          },
          searchValue,
          sortState.value,
        );
        setProducts(productsData);
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setError(error);
      }
      setIsLoadingFirstTime(false);
      setIsFetching(false);
    })();
  }, [
    categoryId,
    sortState,
    brandFilter,
    colorFilter,
    priceFilter,
    sizeFilter,
    searchParams,
  ]);

  return {
    isFetching,
    isLoadingFirstTime,
    data: products,
    error,
  };
}
