import { Paths } from "../../../shared/constants/paths";

export const navigationItems = [
  {
    href: Paths.Catalog,
    value: "Каталог",
  },
  {
    href: `${Paths.Catalog}/${Paths.Men}`,
    value: "Мужская",
  },
  {
    href: `${Paths.Catalog}/${Paths.Women}`,
    value: "Женская",
  },
  {
    href: `${Paths.Catalog}/${Paths.Sale}`,
    value: "Распродажа",
  },
  {
    href: Paths.Main,
    value: "О нас",
  },
];
