import {
  type ProductVariant,
  type AttributePlainEnumValue,
} from "@commercetools/platform-sdk";
import { type ProductData } from "../model/types";
import {
  FilterParamNames,
  type PriceValue,
} from "../../../entities/products-filter";
import { PRODUCTS_LIMIT } from "../api/products";

const getEnumValueFromVariant = (
  name: "brand" | "color",
  variant: ProductVariant,
): AttributePlainEnumValue =>
  variant.attributes?.find((value) => value.name === name)?.value ?? {
    key: "",
    value: "",
  };

export const getAvailableBrands = (
  products: ProductData[],
): AttributePlainEnumValue[] => {
  const brands = products.map((product) => {
    const brandValue = getEnumValueFromVariant("brand", product.allVariants[0]);
    return JSON.stringify(brandValue);
  });
  return Array.from(new Set(brands)).map((value) => JSON.parse(value));
};

export const getAvailableColors = (
  products: ProductData[],
): AttributePlainEnumValue[] => {
  const colors = products.map((product) =>
    product.allVariants.map((variant) => {
      const colorValue = getEnumValueFromVariant("color", variant);
      return JSON.stringify(colorValue);
    }),
  );
  return Array.from(new Set(colors.flat(1))).map((value) => JSON.parse(value));
};

export const getAvailableSizes = (products: ProductData[]): number[] => {
  const sizes = products.map((product) =>
    product.allVariants.map(
      (variant) =>
        variant.attributes?.find((value) => value.name === "sizes")?.value ??
        [],
    ),
  );
  return Array.from(new Set(sizes.flat(2).sort((a, b) => a - b)));
};

export const getMinAndMaxPrices = (products: ProductData[]): PriceValue => {
  const prices = products.map((value) => value.discountPrice ?? value.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

const getAttributesFilterString = (
  name: string,
  values: string[],
  type: "enum" | "common",
): string => {
  const queryVariant = type === "enum" ? ".key" : "";
  return values.length > 0
    ? `variants.attributes.${name}${queryVariant}:${values
        .map((value) => `"${value}"`)
        .join()}`
    : "";
};

const getCentAmount = (priceValue: number): number => Number(`${priceValue}00`);

const getPriceFilterString = (min: number, max: number): string => {
  const minAmount = getCentAmount(min);
  const maxAmount = getCentAmount(max);

  const queryString = "variants.price.centAmount: range";

  if (min !== 0 && max !== 0) {
    return `${queryString} (${minAmount} to ${maxAmount + 1})`;
  }

  if (min !== 0) {
    return `${queryString} (${minAmount} to *)`;
  }

  if (max !== 0) {
    return `${queryString} (* to ${maxAmount})`;
  }

  return "";
};

export const getSearchKeyword = (
  keywords: string[],
  searchValue: string,
): string => {
  if (searchValue === "") {
    return searchValue;
  }
  const matchWords = keywords.filter(
    (word) => word.toLowerCase() === searchValue,
  );
  if (matchWords.length > 0) {
    return matchWords[0];
  }
  if (
    keywords.filter((word) => word.toLowerCase().includes(searchValue))
      .length === 0
  ) {
    return searchValue;
  }
  const keywordsCopy = [...keywords];
  keywordsCopy.sort((first, second) => first.length - second.length);
  return keywordsCopy[0];
};

export const getFiltersArray = (
  categoryId: string,
  searchParams: URLSearchParams,
): string[] => {
  const brandFilters = searchParams.getAll(FilterParamNames.BRAND);
  const colorFilters = searchParams.getAll(FilterParamNames.COLOR);
  const sizeFilters = searchParams.getAll(FilterParamNames.SIZE);
  const minPriceFilter = Number(searchParams.get(FilterParamNames.PRICE_MIN));
  const maxPriceFilter = Number(searchParams.get(FilterParamNames.PRICE_MAX));

  return [
    categoryId !== "" ? `categories.id:"${categoryId}"` : "",
    getAttributesFilterString("brand", brandFilters, "enum"),
    getAttributesFilterString("color", colorFilters, "enum"),
    getAttributesFilterString("sizes", sizeFilters, "common"),
    getPriceFilterString(minPriceFilter, maxPriceFilter),
  ];
};

export const getProductsOffset = (searchParams: URLSearchParams): number => {
  const page = Number(searchParams.get("page")) - 1;
  const offset = page >= 0 ? page * PRODUCTS_LIMIT : 0;
  return offset;
};
