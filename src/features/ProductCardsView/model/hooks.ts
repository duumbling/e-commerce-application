import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import {
  useAppSelector,
  useCustomSearchParams,
} from "../../../shared/model/hooks";
import {
  PRODUCTS_LIMIT,
  getAllProductsByFiltersAndSearchValue,
} from "../api/products";
import {
  getFiltersArray,
  getProductsOffset,
  getSearchKeyword,
} from "../lib/helpers";
import { SortOptions } from "../../../entities/products-sort-select";

export function useFetchProducts(): ProductsFetchResult {
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [pagesCount, setPagesCount] = useState(0);

  const { searchParams } = useCustomSearchParams();

  const searchKeywordsState = useAppSelector(
    (state) => state.searchKeywordsReducer,
  );

  const { currentCategory, isUpdated } = useAppSelector(
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

        const offset = getProductsOffset(searchParams);

        const { data: productsData, total } =
          await getAllProductsByFiltersAndSearchValue(
            getFiltersArray(currentCategory?.id ?? "", searchParams),
            searchValue,
            searchParams.get("sort") ?? SortOptions.PRICE_ASC,
            offset,
          );

        setPagesCount(Math.ceil(total / PRODUCTS_LIMIT));

        setProducts(productsData);
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setError(error);
      }
      setIsCategoryUpdated(false);
      setIsFetching(false);
    })();
  }, [currentCategory, searchParams]);

  useEffect(() => {
    if (isFetching) {
      return;
    }
    setIsCategoryUpdated(isUpdated);
  }, [isFetching, isUpdated]);

  return {
    isFetching,
    isCategoryUpdated,
    data: products,
    pagesCount,
    error,
  };
}
