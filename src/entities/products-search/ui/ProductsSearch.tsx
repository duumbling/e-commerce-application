import React, { useState } from "react";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { Autocomplete, Grid, type GridProps } from "@mui/material";
import { useSearchProducts } from "../model/hooks";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { useAppDispatch } from "../../../shared/model/hooks";
import { searchKeywordsSlice } from "../model/slice";

export function ProductsSearch({ sx }: GridProps) {
  const { searchValue, setSearchValue, keywords, error } = useSearchProducts();

  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const navigate = useNavigate();

  const { setKeywords } = searchKeywordsSlice.actions;

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (searchValue.length > 0) {
      dispatch(setKeywords(keywords));
      navigate({
        pathname: Paths.Catalog,
        search: createSearchParams({
          text: searchValue,
        }).toString(),
      });
    }
  };

  return (
    <Grid
      container
      columnSpacing={1}
      justifyContent="center"
      alignContent="center"
      sx={sx}
    >
      <Grid item md={9} sm={10} xs={9}>
        <Autocomplete
          options={keywords}
          freeSolo
          value={searchValue}
          onChange={(_, value) => {
            setSearchValue(value ?? "");
          }}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              label="Поиск"
            />
          )}
        />
      </Grid>
      <Grid item md={3} sm={2} xs={3}>
        <CustomButton onClick={handleSearch}>Найти</CustomButton>
      </Grid>

      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity="error"
        autoHideDuration={2000}
        open={isErrorMessageVisible}
        onClose={() => {
          setIsErrorMessageVisible(false);
        }}
        message={error?.message}
      />
    </Grid>
  );
}
