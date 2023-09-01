import { Chip, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Paths } from "../../../shared/constants/paths";
import { useNavigate } from "react-router-dom";
import { getCategoriesById } from "../api/categories";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { categoriesSlice } from "../model/slice";

const categoryPaths: Record<string, string> = {
  men: `${Paths.Catalog}/${Paths.Men}`,
  women: `${Paths.Catalog}/${Paths.Women}`,
};

export function CategoryView() {
  const navigate = useNavigate();
  const { setCurrentCategories, setCategoriesParentId } =
    categoriesSlice.actions;

  const handleCategoryClick = (key: string, parentId: string) => {
    navigate(categoryPaths[key]);
    dispatch(setCategoriesParentId(parentId));
  };

  const { values, parentId } = useAppSelector(
    (state) => state.categoriesReducer,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      const {
        body: { results },
      } = await getCategoriesById(parentId);
      dispatch(setCurrentCategories(results));
      console.log(results);
    })();
  }, [parentId]);

  return (
    <Stack direction="row" spacing={2}>
      {values.map((value) => {
        return (
          <Chip
            key={value.id}
            label={value.name["ru-RU"]}
            variant="outlined"
            onClick={() => {
              handleCategoryClick(value.key ?? "", value.id);
            }}
          />
        );
      })}
      {/* <Chip
        label="Мужчинам"
        variant="outlined"
        sx={{ fontSize: 12 }}
        onClick={() => {
          handleCategoryClick(Paths.Men);
        }}
      />
      <Chip
        label="Женщинам"
        variant="outlined"
        onClick={() => {
          handleCategoryClick(Paths.Women);
        }}
      />
      <Chip
        label="Распродажа"
        variant="outlined"
        onClick={() => {
          handleCategoryClick(Paths.Sale);
        }}
      /> */}
    </Stack>
  );
}
