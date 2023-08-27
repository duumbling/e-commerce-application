import {
  type ProductProjection,
  type AttributePlainEnumValue,
} from "@commercetools/platform-sdk";
import { apiRoot } from "../../../shared/api/apiRoot";
import { type Filters, type ProductData } from "../model/types";

const getFilterString = (
  name: string,
  filterValues: AttributePlainEnumValue[],
): string => {
  return filterValues.length > 0
    ? `variants.attributes.${name}.key:${filterValues
        .map((value) => `"${value.key}"`)
        .join()}`
    : "";
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
  if (description === undefined) {
    throw Error("There is no description for any product");
  }
  const priceStr = masterVariant.prices[0].value.centAmount.toString();
  const fractionDigits = masterVariant.prices[0].value.fractionDigits;
  const price = Number(priceStr.substring(0, priceStr.length - fractionDigits));
  return {
    id,
    price,
    title: name["ru-RU"],
    description: description["ru-RU"],
    images: masterVariant.images?.map((img) => img.url) ?? [],
  };
};

export const getAllProductsByCategoryId = async (
  categoryId: string,
  filter: Filters,
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
          getFilterString("brand", filter.brandFilter),
          getFilterString("color", filter.colorFilter),
        ],
        sort,
      },
    })
    .execute();

  return results.map((productProjection) => getProductData(productProjection));
};
