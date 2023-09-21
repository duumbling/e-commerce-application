import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import {
  useAppSelector,
  useCustomSearchParams,
} from "../../../shared/model/hooks";
import { PAGE_LIMIT, getFilteredProducts } from "../api/products";
import { getFiltersArray, getSearchKeyword } from "../lib/helpers";
import { SortOptions } from "../../../entities/products-sort-select";

export function useFetchProducts(): ProductsFetchResult {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { searchParams } = useCustomSearchParams();

  const searchKeywordsState = useAppSelector(
    (state) => state.searchKeywordsReducer,
  );

  const categoryState = useAppSelector((state) => state.categoriesReducer);

  useEffect(() => {
    void (async () => {
      setIsFetching(true);
      try {
        const searchValue = getSearchKeyword(
          searchKeywordsState.keywords,
          searchParams.get("text")?.toLowerCase() ?? "",
        );

        const { data, total } = await getFilteredProducts(
          getFiltersArray(
            categoryState.currentCategory?.id ?? "",
            searchParams,
          ),
          searchValue,
          currentPage,
          searchParams.get("sort") ?? SortOptions.PRICE_ASC,
        );

        setProducts(data);
        if (total !== undefined) {
          setPagesCount(Math.ceil(total / PAGE_LIMIT));
        }
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setError(error);
      }
      setIsFetching(false);
    })();
  }, [categoryState, searchParams, currentPage]);

  return {
    isFetching,
    data: products,
    pagesCount,
    currentPage,
    setCurrentPage,
    error,
  };
}
