import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { useAppDispatch } from "../../../shared/model/hooks";
import { filterSlice } from "../model/slice";
import { PriceSlider } from "./PriceSlider/PriceSlider";

// FIXME: change mock static filters to dynamic filters
const brands = [
  {
    key: "PUMA",
    label: "PUMA",
  },
  {
    key: "NIKE",
    label: "Nike",
  },
  {
    key: "ADIDAS",
    label: "Adidas",
  },
  {
    key: "DEMIX",
    label: "Demix",
  },
];

const colors = [
  {
    key: "BLACK",
    label: "Черный",
  },
  {
    key: "WHITE",
    label: "Белый",
  },
  {
    key: "GREEN",
    label: "Зеленый",
  },
  {
    key: "BEIGE",
    label: "Бежевый",
  },
];

const availableSizes = [39, 40, 41, 42, 43];

export function ProductsFilter() {
  const { updateEnumFilters, updateSizeFilter } = filterSlice.actions;

  const dispatch = useAppDispatch();

  return (
    <Box maxWidth={183}>
      <Box>
        <Typography>Бренд</Typography>
        <Stack>
          {brands.map((brand) => (
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
      <Box>
        <Typography>Цвет</Typography>
        <Stack>
          {colors.map((value) => (
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
      <Box>
        <Typography>Размер</Typography>
        <Stack>
          {availableSizes.map((value) => (
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
      <Box>
        <Typography>Цена</Typography>
        {/* FIXME: Change min and max static constants to dynamic min and max prices */}
        <PriceSlider min={2700} max={7200} />
      </Box>
    </Box>
  );
}
