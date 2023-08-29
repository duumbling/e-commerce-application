import {
  type ProductVariant,
  type AttributePlainEnumValue,
} from "@commercetools/platform-sdk";
import { type ProductData } from "../model/types";
import { type PriceValue } from "../../../entities/products-filter";

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

export const getSearchKeyword = (
  keywords: string[],
  searchValue: string,
): string => {
  if (searchValue === "") {
    return searchValue;
  }
  if (keywords.filter((word) => word.includes(searchValue)).length === 0) {
    return searchValue;
  }
  const keywordsCopy = [...keywords];
  keywordsCopy.sort((first, second) => first.length - second.length);
  return keywordsCopy[0];
};
