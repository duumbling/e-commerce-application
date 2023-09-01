import React from "react";
import { CatalogPage } from "../../pages/catalog";
import { Paths } from "../../shared/constants/paths";
import { Route, Routes, type RouteObject } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import { NotFoundPage } from "../../pages/notFound";
import { RegisterPage } from "../../pages/register";
import { Layout } from "./Layout";

const shoesTypePaths: RouteObject[] = [
  {
    path: Paths.Sneakers,
    element: <CatalogPage />,
  },
  {
    path: Paths.Boots,
    element: <CatalogPage />,
  },
  {
    path: Paths.FlipFlops,
    element: <CatalogPage />,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      <Route path={Paths.Main} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={Paths.Login} element={<LoginPage />} />
        <Route path={Paths.Register} element={<RegisterPage />} />
        <Route path={Paths.NotFound} element={<NotFoundPage />} />
        <Route path={Paths.Catalog} element={<CatalogPage />}>
          <Route path={Paths.Men} element={<CatalogPage />}>
            {shoesTypePaths.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path={Paths.Women} element={<CatalogPage />}>
            {shoesTypePaths.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path={Paths.Sale} element={<CatalogPage />}>
            {shoesTypePaths.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
