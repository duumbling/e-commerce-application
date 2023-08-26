import { type SelectItem, SortOptions, type SortValue } from "./types";

export const SelectItems: Record<SortValue, SelectItem> = {
  [SortOptions.NAME_ASC]: {
    label: "По алфавиту (а-я)",
    index: 0,
  },
  [SortOptions.NAME_DESC]: {
    label: "По алфавиту (я-а)",
    index: 1,
  },
  [SortOptions.PRICE_ASC]: {
    label: "По возрастанию цены",
    index: 2,
  },
  [SortOptions.PRICE_DESC]: {
    label: "По убыванию цены",
    index: 3,
  },
};
