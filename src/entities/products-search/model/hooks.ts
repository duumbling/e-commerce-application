import { useState, useEffect } from "react";
import { searchByWord } from "../api/search";

export function useSearchProducts() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const { body } = await searchByWord(searchValue);
        setKeywords(body["searchKeywords.ru-RU"].map((value) => value.text));
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setError(error);
      }
    })();
  }, [searchValue]);

  return {
    searchValue,
    keywords,
    setSearchValue,
    error,
  };
}
