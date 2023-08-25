import { type SortOptions } from "./sort-options";

export interface ProductData {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
}

export type SortType = keyof typeof SortOptions;
