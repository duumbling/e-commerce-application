import { Paths, CatalogPaths } from "../../../shared/constants/paths";

interface ProductCategory {
  path: string;
  breadcrumb: string;
  slug: string;
}

const getShoesTypeBreadcrumbs = (parent: CatalogPaths): ProductCategory[] => {
  return [
    {
      path: `${Paths.Catalog}/${parent}/${CatalogPaths.Sneakers}`,
      breadcrumb: "Кроссовки",
      slug: `${parent}-sneakers`,
    },
    {
      path: `${Paths.Catalog}/${parent}/${CatalogPaths.Boots}`,
      breadcrumb: "Ботинки",
      slug: `${parent}-boots`,
    },
    {
      path: `${Paths.Catalog}/${parent}/${CatalogPaths.FlipFlops}`,
      breadcrumb: "Шлепанцы",
      slug: `${parent}-flip-flops`,
    },
  ];
};

export const categoriesData: ProductCategory[] = [
  {
    path: Paths.Main,
    breadcrumb: "Главная",
    slug: "",
  },
  {
    path: Paths.Catalog,
    breadcrumb: "Каталог",
    slug: "",
  },
  {
    path: `${Paths.Catalog}/${CatalogPaths.Men}`,
    breadcrumb: "Мужская обувь",
    slug: "men",
  },
  {
    path: `${Paths.Catalog}/${CatalogPaths.Women}`,
    breadcrumb: "Женская обувь",
    slug: "women",
  },
  {
    path: `${Paths.Catalog}/${CatalogPaths.Sale}`,
    breadcrumb: "Распродажа",
    slug: "sale",
  },
  ...getShoesTypeBreadcrumbs(CatalogPaths.Men),
  ...getShoesTypeBreadcrumbs(CatalogPaths.Women),
  ...getShoesTypeBreadcrumbs(CatalogPaths.Sale),
];
