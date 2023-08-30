import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { type URLSearchParamsInit, useSearchParams } from "react-router-dom";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCustomSearchParams = (defaultInit?: URLSearchParamsInit) => {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);

  const deleteValue = (key: string, value: string): boolean => {
    if (!searchParams.has(key)) {
      return false;
    }
    const newValues = searchParams
      .getAll(key)
      .filter((paramValue) => paramValue !== value);
    searchParams.delete(key);
    newValues.forEach((newValue) => {
      searchParams.append(key, newValue);
    });
    return true;
  };

  return {
    searchParams,
    deleteValue,
    setSearchParams,
  };
};
