import { SortOptions, type SelectItem } from "./types";

export const SelectItems: Record<keyof typeof SortOptions, SelectItem> = {
  NAME_ASC: {
    label: "По алфавиту (а-я)",
    value: SortOptions.NAME_ASC,
    index: 0,
  },
  NAME_DESC: {
    label: "По алфавиту (я-а)",
    value: SortOptions.NAME_DESC,
    index: 1,
  },
  PRICE_ASC: {
    label: "По возрастанию цены",
    value: SortOptions.PRICE_ASC,
    index: 2,
  },
  PRICE_DESC: {
    label: "По убыванию цены",
    value: SortOptions.PRICE_DESC,
    index: 3,
  },
};

export const SelectItemKeys: Record<string, SelectItem> = {
  [SortOptions.NAME_ASC]: SelectItems.NAME_ASC,
  [SortOptions.NAME_DESC]: SelectItems.NAME_DESC,
  [SortOptions.PRICE_ASC]: SelectItems.PRICE_ASC,
  [SortOptions.PRICE_DESC]: SelectItems.PRICE_DESC,
};
