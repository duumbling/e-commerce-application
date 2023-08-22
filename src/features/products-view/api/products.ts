import { apiRoot } from "../../../shared/api/apiRoot";
import { type ProductData } from "../model/types";

export const getAllProductsByCategoryId = async (
  categoryId: string,
): Promise<ProductData[]> => {
  const {
    body: { results },
  } = await apiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${categoryId}"`,
        sort: "variants.sku",
      },
    })
    .execute();
  return results.map(({ id, name, description, masterVariant }) => {
    if (masterVariant.prices === undefined) {
      throw Error("There is no any price for some product");
    }
    if (description === undefined) {
      throw Error("There is no any description for some product");
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
