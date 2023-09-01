import { Paths } from "../../../shared/constants/paths";

interface Breadcrumb {
  path: string;
  breadcrumb: string;
}

const getShoesTypeBreadcrumbs = (parent: Paths): Breadcrumb[] => {
  return [
    {
      path: `${Paths.Catalog}/${parent}/${Paths.Sneakers}`,
      breadcrumb: "Кроссовки",
    },
    {
      path: `${Paths.Catalog}/${parent}/${Paths.Boots}`,
      breadcrumb: "Ботинки",
    },
    {
      path: `${Paths.Catalog}/${parent}/${Paths.FlipFlops}`,
      breadcrumb: "Шлепанцы",
    },
  ];
};

export const breadcrumbs: Breadcrumb[] = [
  {
    path: Paths.Main,
    breadcrumb: "Главная",
  },
  {
    path: Paths.Catalog,
    breadcrumb: "Каталог",
  },
  {
    path: `${Paths.Catalog}/${Paths.Men}`,
    breadcrumb: "Мужская обувь",
  },
  {
    path: `${Paths.Catalog}/${Paths.Women}`,
    breadcrumb: "Женская обувь",
  },
  {
    path: `${Paths.Catalog}/${Paths.Sale}`,
    breadcrumb: "Распродажа",
  },
  ...getShoesTypeBreadcrumbs(Paths.Men),
  ...getShoesTypeBreadcrumbs(Paths.Women),
  ...getShoesTypeBreadcrumbs(Paths.Sale),
];
