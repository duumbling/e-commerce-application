import { useState, useEffect, useRef } from "react";
import { KEYWORDS_QUERY_NAME, getProductKeywords } from "../api/search";
import { debounce } from "lodash";

export function useSearchProducts() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const [error, setError] = useState<Error | null>(null);

  const searchKeywords = async (value: string) => {
    try {
      const { body } = await getProductKeywords(value);
      const foundKeywords = body[KEYWORDS_QUERY_NAME].map(
        (keyword) => keyword.text,
      );
      setKeywords(foundKeywords);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      setError(error);
    }
  };

  const debouncedSearchFunction = useRef(debounce(searchKeywords, 500)).current;

  useEffect(() => {
    if (searchValue === "") {
      return;
    }
    void debouncedSearchFunction(searchValue);

    return () => {
      debouncedSearchFunction.cancel();
    };
  }, [searchValue]);

  return {
    searchValue,
    keywords,
    setSearchValue,
    error,
  };
}
