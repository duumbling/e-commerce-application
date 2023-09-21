import { Paths, CatalogPaths } from "../../../shared/constants/paths";

export const navigationItems = [
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
    href: `${Paths.About}`,
    value: "О нас",
  },
];
