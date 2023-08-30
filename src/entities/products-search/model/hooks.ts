import { useState, useEffect } from "react";
import { getProductKeywords } from "../api/search";

export function useSearchProducts() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      void (async () => {
        try {
          const { body } = await getProductKeywords(searchValue);
          setKeywords(body["searchKeywords.ru-RU"].map((value) => value.text));
        } catch (error) {
          if (!(error instanceof Error)) {
            throw error;
          }
          setError(error);
        }
      })();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  return {
    searchValue,
    keywords,
    setSearchValue,
    error,
  };
}
