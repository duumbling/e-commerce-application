import type {
  TypedMoney,
  ProductProjection,
  ProductVariant as SdkProductVariant,
  Attribute,
  Price,
} from "@commercetools/platform-sdk";
import { apiRoot } from "./apiRoot";
import type {
  ProductAttribute,
  ProductAttributeValue,
  ProductData,
  ProductVariant,
} from "../types/product";

export const getPriceValue = (price: TypedMoney): number => {
  const priceStr = price.centAmount.toString();
  const fractionDigits = price.fractionDigits;
  return Number(priceStr.substring(0, priceStr.length - fractionDigits));
};

export const getDiscountPrice = (price: Price): number | undefined =>
  price.discounted !== undefined
    ? getPriceValue(price.discounted.value)
    : undefined;

export const getVariantData = ({
  attributes,
  ...otherVariantData
}: SdkProductVariant): ProductVariant => {
  const getAttribute = <T>(
    attribute: Attribute | undefined,
    defaultValue: T,
  ): ProductAttributeValue<T> => {
    const productAttribute = { key: "", label: defaultValue };

    if (attribute !== undefined) {
      const { value, name } = attribute;
      if (name === "sizes") {
        productAttribute.key = name;
        productAttribute.label = value;
      } else if (value instanceof Object) {
        productAttribute.key = value.key;
        productAttribute.label = value.label;
      }
    }

    return productAttribute;
  };

  attributes = attributes ?? [];

  const [brand, color, sizes] = attributes;

  const productAttributes: ProductAttribute = {
    brand: getAttribute(brand, ""),
    color: getAttribute(color, ""),
    sizes: getAttribute(sizes, []),
  };

  return {
    ...otherVariantData,
    attributes: productAttributes,
  };
};

export const getProductData = ({
  id,
  name,
  description,
  masterVariant,
  variants,
}: ProductProjection): ProductData => {
  if (masterVariant.prices === undefined) {
    throw Error(`There is no price for ${name["ru-RU"]} product`);
  }

  return {
    id,
    price: getPriceValue(masterVariant.prices[0].value),
    discountPrice: getDiscountPrice(masterVariant.prices[0]),
    title: name["ru-RU"],
    description: description !== undefined ? description["ru-RU"] : undefined,
    images: masterVariant.images?.map((img) => img.url) ?? [],
    allVariants: [masterVariant, ...variants].map(getVariantData),
  };
};

export const getProductById = async (id: string) => {
  return await apiRoot()
    .productProjections()
    .withId({ ID: id })
    .get({ queryArgs: {} })
    .execute();
};
