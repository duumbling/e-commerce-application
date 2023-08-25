export const SortOptions = {
  PRICE_ASC: "price asc",
  PRICE_DESC: "price desc",
  NAME_ASC: "name.ru-RU asc",
  NAME_DESC: "name.ru-RU desc",
} as const;

export type ValueOf<T> = T[keyof T];

export type SortValue = ValueOf<typeof SortOptions>;

export interface SortType {
  name: keyof typeof SortOptions;
  value: SortValue;
}

export interface SelectItem {
  label: string;
  index: number;
}
