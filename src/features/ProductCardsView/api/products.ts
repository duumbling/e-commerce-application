import {
  type ProductProjection,
  type AttributePlainEnumValue,
  type TypedMoney,
  type ProductVariant,
} from "@commercetools/platform-sdk";
import { apiRoot } from "../../../shared/api/apiRoot";
import { type Filters, type ProductData } from "../model/types";

const getEnumTypeFilterString = (
  name: string,
  filterValues: AttributePlainEnumValue[],
): string => {
  return filterValues.length > 0
    ? `variants.attributes.${name}.key:${filterValues
        .map((value) => `"${value.key}"`)
        .join()}`
    : "";
};

const getCentAmount = (priceValue: number): number => Number(`${priceValue}00`);

const getPriceFilterString = (min: number, max: number): string => {
  return min !== 0 && max !== 0
    ? `variants.price.centAmount:range (${getCentAmount(
        min,
      )} to ${getCentAmount(max + 1)})`
    : "";
};

const getSizeFilterString = (sizeFilter: number[]): string =>
  sizeFilter.length > 0
    ? `variants.attributes.sizes:${sizeFilter
        .map((value) => `"${value}"`)
        .join(",")}`
    : "";

const getPriceValue = (price: TypedMoney): number => {
  const priceStr = price.centAmount.toString();
  const fractionDigits = price.fractionDigits;
  return Number(priceStr.substring(0, priceStr.length - fractionDigits));
};

const getMatchingVariant = (
  masterVariant: ProductVariant,
  variants: ProductVariant[],
): ProductVariant =>
  masterVariant.isMatchingVariant ?? false
    ? masterVariant
    : variants.filter((value) => value.isMatchingVariant ?? false)[0];

const getProductData = ({
  id,
  name,
  description,
  masterVariant,
  variants,
}: ProductProjection): ProductData => {
  const matchingVariant = getMatchingVariant(masterVariant, variants);

  if (
    matchingVariant.prices === undefined ||
    matchingVariant.prices.length === 0
  ) {
    throw Error(`There is no price for ${name["ru-RU"]} product`);
  }

  return {
    id,
    price: getPriceValue(matchingVariant.prices[0].value),
    discountPrice:
      matchingVariant.prices[0]?.discounted !== undefined
        ? getPriceValue(matchingVariant.prices[0].discounted.value)
        : undefined,
    title: name["ru-RU"],
    description: description !== undefined ? description["ru-RU"] : undefined,
    images: matchingVariant.images?.map((img) => img.url) ?? [],
    allVariants: [masterVariant, ...variants],
  };
};

export const searchByWord = async (word: string) => {
  return await apiRoot()
    .productProjections()
    .suggest()
    .get({
      queryArgs: {
        "searchKeywords.ru-RU": word,
        fuzzy: true,
      },
    })
    .execute();
};

export const getAllProductsByCategoryId = async (
  categoryId: string,
  { brandFilter, colorFilter, priceFilter, sizeFilter }: Filters,
  searchValue: string,
  sort?: string,
): Promise<ProductData[]> => {
  const {
    body: { results },
  } = await apiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [
          categoryId !== "" ? `categories.id:"${categoryId}"` : "",
          getEnumTypeFilterString("brand", brandFilter),
          getEnumTypeFilterString("color", colorFilter),
          getPriceFilterString(priceFilter.min, priceFilter.max),
          getSizeFilterString(sizeFilter),
        ],
        sort,
        markMatchingVariants: true,
        "text.ru-RU": searchValue,
      },
    })
    .execute();
  console.log(results);
  return results.map(getProductData);
};
