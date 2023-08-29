import React, { useState } from "react";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import { Autocomplete, Grid, type GridProps } from "@mui/material";
import { useSearchProducts } from "../model/hooks";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";

export function ProductsSearchInput({ sx }: GridProps) {
  const { searchValue, setSearchValue, keywords, error } = useSearchProducts();

  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const navigate = useNavigate();

  if (error !== null) {
    setIsErrorMessageVisible(true);
  }

  const handleSearch = () => {
    if (searchValue.length > 0) {
      navigate(`${Paths.Catalog}?search=${searchValue}`);
    }
  };

  return (
    <Grid
      container
      columnSpacing={1}
      justifyContent="ceenter"
      alignContent="center"
      sx={sx}
    >
      <Grid item md={9} sm={9} xs={9}>
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
      <Grid item md={3} sm={3} xs={3}>
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
