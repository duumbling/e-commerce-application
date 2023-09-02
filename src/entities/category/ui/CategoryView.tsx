import React, { useEffect } from "react";
import { Chip, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/categories";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { categoriesSlice } from "../model/slice";
import { categoriesData } from "../model/model";
import { Paths } from "../../../shared/constants/paths";

export function CategoryView() {
  const navigate = useNavigate();

  const { setAllCategories, setCurrentCategories } = categoriesSlice.actions;

  const handleCategoryClick = (slug: string) => {
    const categoryPath =
      categoriesData.find((value) => value.slug === slug)?.path ?? "";
    navigate(categoryPath);
  };

  const { currentCategories, allCategories } = useAppSelector(
    (state) => state.categoriesReducer,
  );

  const location = useLocation();

  const dispatch = useAppDispatch();

  const updateCurrentCategoriesState = () => {
    const categoryData = categoriesData.find(
      (value) => value.path === location.pathname,
    );
    if (categoryData?.path === Paths.Catalog) {
      const currentCategories = allCategories.filter(
        (category) => category.parent === undefined,
      );
      dispatch(setCurrentCategories(currentCategories));
    } else {
      const parentCategory = allCategories.find(
        (category) => category.slug["ru-RU"] === categoryData?.slug,
      );
      const currentCategories = allCategories.filter(
        (category) => category?.parent?.id === parentCategory?.id,
      );
      dispatch(setCurrentCategories(currentCategories));
    }
  };

  useEffect(() => {
    void (async () => {
      const {
        body: { results },
      } = await getAllCategories();
      dispatch(setAllCategories(results));
    })();
  }, []);

  useEffect(() => {
    updateCurrentCategoriesState();
  }, [location, allCategories]);

  return (
    <Stack direction="row" spacing={2}>
      {currentCategories.map((value) => {
        return (
          <Chip
            key={value.id}
            label={value.name["ru-RU"]}
            variant="outlined"
            onClick={() => {
              handleCategoryClick(value.slug["ru-RU"] ?? "");
            }}
          />
        );
      })}
    </Stack>
  );
}
