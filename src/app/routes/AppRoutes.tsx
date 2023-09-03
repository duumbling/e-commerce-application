import React from "react";
import { CatalogPage } from "../../pages/catalog";
import { Paths, CatalogPaths } from "../../shared/constants/paths";
import { Route, Routes, type RouteObject } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import { NotFoundPage } from "../../pages/notFound";
import { RegisterPage } from "../../pages/register";
import { Layout } from "./Layout";
import { DetailedProductPage } from "../../pages/detailedProduct";

const shoesTypePaths: RouteObject[] = [
  {
    path: CatalogPaths.Sneakers,
    element: <CatalogPage />,
  },
  {
    path: CatalogPaths.Boots,
    element: <CatalogPage />,
  },
  {
    path: CatalogPaths.FlipFlops,
    element: <CatalogPage />,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.Main} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path={`${Paths.Product}/:id`}
          element={<DetailedProductPage />}
        />
        <Route path={Paths.Login} element={<LoginPage />} />
        <Route path={Paths.Register} element={<RegisterPage />} />
        <Route path={Paths.NotFound} element={<NotFoundPage />} />
        <Route path={Paths.Catalog} element={<CatalogPage />}>
          <Route path={CatalogPaths.Men} element={<CatalogPage />}>
            {shoesTypePaths.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path={CatalogPaths.Women} element={<CatalogPage />}>
            {shoesTypePaths.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path={CatalogPaths.Sale} element={<CatalogPage />}>
            {shoesTypePaths.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
