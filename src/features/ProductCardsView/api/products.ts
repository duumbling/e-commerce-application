import {
  type ProductProjection,
  type TypedMoney,
  type ProductVariant,
} from "@commercetools/platform-sdk";
import { apiRoot } from "../../../shared/api/apiRoot";
import { type ProductData } from "../model/types";
import { getVariantData } from "../../../shared/api/product";
import { getCategoryFilter } from "../lib/helpers";

const PRODUCTS_LIMIT = 30;
export const PAGE_LIMIT = 4;

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
    currentVariant: getVariantData(matchingVariant),
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

export const getProductsByCategoryId = async (
  categoryId: string,
): Promise<ProductData[]> => {
  const {
    body: { results },
  } = await apiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [getCategoryFilter(categoryId)],
        limit: PRODUCTS_LIMIT,
        markMatchingVariants: true,
      },
    })
    .execute();
  return results.map(getProductData);
};

export const getFilteredProducts = async (
  filters: string[],
  searchValue: string,
  pageNumber: number,
  sort?: string,
): Promise<{ data: ProductData[]; total?: number }> => {
  const {
    body: { results, total },
  } = await apiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filters,
        sort,
        markMatchingVariants: true,
        "text.ru-RU": searchValue,
        limit: PAGE_LIMIT,
        offset: (pageNumber - 1) * PAGE_LIMIT,
        withTotal: true,
      },
    })
    .execute();
  return {
    data: results.map(getProductData),
    total,
  };
};
