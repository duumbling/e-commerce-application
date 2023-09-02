import {
  type ProductProjection,
  type TypedMoney,
  type ProductVariant,
  type Category,
} from "@commercetools/platform-sdk";
import { apiRoot } from "../../../shared/api/apiRoot";
import { type Filters, type ProductData } from "../model/types";

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

const getCategoriesFilterString = (categories: Category[]): string =>
  `categories.id:${categories.map((value) => `"${value.id}"`).join()}`;

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
  currentCategories: Category[],
  { brand, color, price, size }: Filters,
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
          getCategoriesFilterString(currentCategories),
          getAttributesFilterString("brand", brand, "enum"),
          getAttributesFilterString("color", color, "enum"),
          getAttributesFilterString("sizes", size, "common"),
          getPriceFilterString(price.min, price.max),
        ],
        sort,
        markMatchingVariants: true,
        "text.ru-RU": searchValue,
      },
    })
    .execute();
  return results.map(getProductData);
};
