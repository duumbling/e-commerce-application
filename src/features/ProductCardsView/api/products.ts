import { apiRoot } from "../../../shared/api/apiRoot";
import { type ProductData } from "../model/types";

export const getAllProductsByCategoryId = async (
  categoryId: string,
  sort?: string,
): Promise<ProductData[]> => {
  const {
    body: { results },
  } = await apiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${categoryId}"`,
        sort,
      },
    })
    .execute();

  return results.map(({ id, name, description, masterVariant }) => {
    if (masterVariant.prices === undefined) {
      throw Error("There is no price for any product");
    }
    if (description === undefined) {
      throw Error("There is no description for any product");
    }
    const priceStr = masterVariant.prices[0].value.centAmount.toString();
    const fractionDigits = masterVariant.prices[0].value.fractionDigits;
    const price = Number(
      priceStr.substring(0, priceStr.length - fractionDigits),
    );
    return {
      id,
      price,
      title: name["ru-RU"],
      description: description["ru-RU"],
      images: masterVariant.images?.map((img) => img.url) ?? [],
    };
  });
};
