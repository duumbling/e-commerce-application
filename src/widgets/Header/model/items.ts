import { Paths, CatalogPaths } from "../../../shared/constants/paths";

export const navigationItems = [
  {
    href: Paths.Catalog,
    value: "Каталог",
  },
  {
    href: `${Paths.Catalog}/${CatalogPaths.Men}`,
    value: "Мужская",
  },
  {
    href: `${Paths.Catalog}/${CatalogPaths.Women}`,
    value: "Женская",
  },
  {
    href: `${Paths.Catalog}/${CatalogPaths.Sale}`,
    value: "Распродажа",
  },
  {
    href: Paths.Main,
    value: "О нас",
  },
];
