import React, { useEffect } from "react";
import { Chip, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/categories";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { categoriesSlice } from "../model/slice";
import { categoriesData } from "../model/model";
import { Paths } from "../../../shared/constants/paths";
import { type Category } from "@commercetools/platform-sdk";

export function CategoryView() {
  const navigate = useNavigate();

  const {
    setAllCategories,
    setCurrentCategories,
    setCategoriesIsUpdated,
    setCurrentCategory,
  } = categoriesSlice.actions;

  const handleCategoryClick = (slug: string) => {
    const categoryPath =
      categoriesData.find((value) => value.slug === slug)?.path ?? "";
    navigate(categoryPath);
  };

  const { availableCategories, allCategories } = useAppSelector(
    (state) => state.categoriesReducer,
  );

  const { pathname, search } = useLocation();

  const dispatch = useAppDispatch();

  const updateCurrentCategoriesState = () => {
    let parentCategory: Category | undefined;
    let currentCategories: Category[] = [];

    const categoryData = categoriesData.find(
      (value) => value.path === pathname,
    );

    if (categoryData?.path === Paths.Catalog) {
      currentCategories = allCategories.filter(
        (category) => category.parent === undefined,
      );
    } else {
      parentCategory = allCategories.find(
        (category) => category.slug["ru-RU"] === categoryData?.slug,
      );

      currentCategories = allCategories.filter(
        (category) => category?.parent?.id === parentCategory?.id,
      );
    }
    dispatch(setCurrentCategories(currentCategories));
    dispatch(setCurrentCategory(parentCategory));
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
    dispatch(setCategoriesIsUpdated(false));
  }, [search]);

  useEffect(() => {
    updateCurrentCategoriesState();
    dispatch(setCategoriesIsUpdated(true));
  }, [pathname, allCategories]);

  return (
    <Stack direction="row" spacing={2}>
      {availableCategories.map((value) => {
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
