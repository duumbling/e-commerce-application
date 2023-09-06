import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import {
  useAppSelector,
  useCustomSearchParams,
} from "../../../shared/model/hooks";
import { getFilteredProducts } from "../api/products";
import { getFiltersArray, getSearchKeyword } from "../lib/helpers";
import { SortOptions } from "../../../entities/products-sort-select";

export const PAGE_LIMIT = 4;

export function useFetchProducts(): ProductsFetchResult {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [pagesCount, setPagesCount] = useState(0);

  const { searchParams } = useCustomSearchParams();

  const searchKeywordsState = useAppSelector(
    (state) => state.searchKeywordsReducer,
  );

  const { currentCategory } = useAppSelector(
    (state) => state.categoriesReducer,
  );

  useEffect(() => {
    void (async () => {
      setIsFetching(true);
      try {
        const searchValue = getSearchKeyword(
          searchKeywordsState.keywords,
          searchParams.get("text")?.toLowerCase() ?? "",
        );

        const productsData = await getFilteredProducts(
          getFiltersArray(currentCategory?.id ?? "", searchParams),
          searchValue,
          searchParams.get("sort") ?? SortOptions.PRICE_ASC,
        );

        setPagesCount(Math.ceil(productsData.length / PAGE_LIMIT));

        setProducts(productsData);
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setError(error);
      }
      setIsFetching(false);
    })();
  }, [currentCategory, searchParams]);

  return {
    isFetching,
    data: products,
    pagesCount,
    error,
  };
}
