import {
  type ProductProjection,
  type TypedMoney,
  type ProductVariant,
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

const getCentAmount = (priceValue: number): number => Number(`${priceValue}00`);

const getPriceFilterString = (min: number, max: number): string => {
  return min !== 0 && max !== 0
    ? `variants.price.centAmount:range (${getCentAmount(
        min,
      )} to ${getCentAmount(max + 1)})`
    : "";
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

  if (matchingVariant.prices === undefined) {
    throw Error("There is no price for any product");
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

export const getAllProductsByCategoryId = async (
  categoryId: string,
  { brand, color, price, size }: Filters,
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
          getAttributesFilterString("brand", brand, "enum"),
          getAttributesFilterString("color", color, "enum"),
          getAttributesFilterString("sizes", size, "common"),
          getPriceFilterString(price.min, price.max),
        ],
        sort,
        markMatchingVariants: true,
      },
    })
    .execute();
  return results.map(getProductData);
};
