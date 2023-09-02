import { Paths } from "../../../shared/constants/paths";

interface Breadcrumb {
  path: string;
  breadcrumb: string;
  slug: string;
}

const getShoesTypeBreadcrumbs = (parent: Paths): Breadcrumb[] => {
  return [
    {
      path: `${Paths.Catalog}/${parent}/${Paths.Sneakers}`,
      breadcrumb: "Кроссовки",
      slug: `${parent}-sneakers`,
    },
    {
      path: `${Paths.Catalog}/${parent}/${Paths.Boots}`,
      breadcrumb: "Ботинки",
      slug: `${parent}-boots`,
    },
    {
      path: `${Paths.Catalog}/${parent}/${Paths.FlipFlops}`,
      breadcrumb: "Шлепанцы",
      slug: `${parent}-flip-flops`,
    },
  ];
};

export const categoriesData: Breadcrumb[] = [
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
    path: `${Paths.Catalog}/${Paths.Men}`,
    breadcrumb: "Мужская обувь",
    slug: "men",
  },
  {
    path: `${Paths.Catalog}/${Paths.Women}`,
    breadcrumb: "Женская обувь",
    slug: "women",
  },
  {
    path: `${Paths.Catalog}/${Paths.Sale}`,
    breadcrumb: "Распродажа",
    slug: "sale",
  },
  ...getShoesTypeBreadcrumbs(Paths.Men),
  ...getShoesTypeBreadcrumbs(Paths.Women),
  ...getShoesTypeBreadcrumbs(Paths.Sale),
];
