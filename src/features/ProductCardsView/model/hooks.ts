import { useEffect, useState } from "react";
import { type ProductData, type ProductsFetchResult } from "./types";
import {
  useAppSelector,
  useCustomSearchParams,
} from "../../../shared/model/hooks";
import { getAllProductsByCategoryId } from "../api/products";
import { getSearchKeyword } from "../lib/helpers";
import { FilterParamNames } from "../../../entities/products-filter/model/types";
import { SortOptions } from "../../../entities/products-sort-select";

export function useFetchProducts(): ProductsFetchResult {
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

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

        const productsData = await getAllProductsByCategoryId(
          currentCategory?.id ?? "",
          {
            brand: searchParams.getAll(FilterParamNames.BRAND),
            color: searchParams.getAll(FilterParamNames.COLOR),
            size: searchParams.getAll(FilterParamNames.SIZE),
            price: {
              min: Number(searchParams.get(FilterParamNames.PRICE_MIN)),
              max: Number(searchParams.get(FilterParamNames.PRICE_MAX)),
            },
          },
          searchValue,
          searchParams.get("sort") ?? SortOptions.PRICE_ASC,
        );
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
    error,
  };
}
