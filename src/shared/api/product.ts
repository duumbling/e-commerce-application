import {
  type TypedMoney,
  type ProductProjection,
  type ProductVariant as SdkProductVariant,
  type Attribute,
} from "@commercetools/platform-sdk";
import { customerDataApiRoot } from "./apiRoot";
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
    discountPrice:
      masterVariant.prices[0]?.discounted !== undefined
        ? getPriceValue(masterVariant.prices[0].discounted.value)
        : undefined,
    title: name["ru-RU"],
    description: description !== undefined ? description["ru-RU"] : undefined,
    images: masterVariant.images?.map((img) => img.url) ?? [],
    allVariants: [masterVariant, ...variants].map(getVariantData),
  };
};

export const getProductById = async (id: string) => {
  return await customerDataApiRoot()
    .productProjections()
    .withId({ ID: id })
    .get({ queryArgs: {} })
    .execute();
};
