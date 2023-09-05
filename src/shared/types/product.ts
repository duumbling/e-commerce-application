import type { ProductVariant as SdkProductVariant } from "@commercetools/platform-sdk";

export interface ProductData {
  id: string;
  title: string;
  images: string[];
  price: number;
  allVariants: ProductVariant[];
  description?: string;
  discountPrice?: number;
}

export interface ProductVariant extends Omit<SdkProductVariant, "attributes"> {
  readonly attributes: ProductAttribute;
}

export interface ProductAttribute {
  readonly brand: ProductAttributeValue<string>;
  readonly color: ProductAttributeValue<string>;
  readonly sizes: ProductAttributeValue<number[]>;
}

export interface ProductAttributeValue<T> {
  key: string;
  label: T;
}
