import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { filterSlice } from "../model/slice";
import { PriceSlider } from "./PriceSlider/PriceSlider";

export function ProductsFilter() {
  const { updateEnumFilters, updateSizeFilter } = filterSlice.actions;

  const { availableFilterValues } = useAppSelector(
    (state) => state.productsFilterReducer,
  );

  const dispatch = useAppDispatch();

  return (
    <Box maxWidth={183}>
      {availableFilterValues.brands.length > 0 && (
        <Box>
          <Typography>Бренд</Typography>
          <Stack>
            {availableFilterValues.brands.map((brand) => (
              <Checkbox
                key={brand.key}
                label={brand.label}
                onChange={() => {
                  dispatch(updateEnumFilters({ name: "brand", data: brand }));
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {availableFilterValues.colors.length > 0 && (
        <Box>
          <Typography>Цвет</Typography>
          <Stack>
            {availableFilterValues.colors.map((value) => (
              <Checkbox
                key={value.key}
                label={value.label}
                onChange={() => {
                  dispatch(updateEnumFilters({ name: "color", data: value }));
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {availableFilterValues.sizes.length > 0 && (
        <Box>
          <Typography>Размер</Typography>
          <Stack>
            {availableFilterValues.sizes.map((value) => (
              <Checkbox
                key={value}
                label={value}
                onChange={() => {
                  dispatch(updateSizeFilter(value));
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
      {availableFilterValues.prices.min > 0 && (
        <Box>
          <Typography>Цена</Typography>
          <PriceSlider
            min={availableFilterValues.prices.min}
            max={availableFilterValues.prices.max}
          />
        </Box>
      )}
    </Box>
  );
}
