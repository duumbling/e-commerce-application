import {
  type ProductProjection,
  type AttributePlainEnumValue,
  type TypedMoney,
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
      )} to ${getCentAmount(max)})`
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

const getProductData = ({
  id,
  name,
  description,
  masterVariant,
}: ProductProjection): ProductData => {
  if (masterVariant.prices === undefined) {
    throw Error("There is no price for any product");
  }

  return {
    id,
    price: getPriceValue(masterVariant.prices[0].value),
    discountPrice:
      masterVariant.prices[0]?.discounted !== undefined
        ? getPriceValue(masterVariant.prices[0].discounted.value)
        : undefined,
    title: name["ru-RU"],
    description: description !== undefined ? description["ru-RU"] : undefined,
    images: masterVariant.images?.map((img) => img.url) ?? [],
  };
};

export const getAllProductsByCategoryId = async (
  categoryId: string,
  { brandFilter, colorFilter, priceFilter, sizeFilter }: Filters,
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
          `categories.id:"${categoryId}"`,
          getEnumTypeFilterString("brand", brandFilter),
          getEnumTypeFilterString("color", colorFilter),
          getPriceFilterString(priceFilter.min, priceFilter.max),
          getSizeFilterString(sizeFilter),
        ],
        sort,
      },
    })
    .execute();
  console.log(results);
  return results.map(getProductData);
};
