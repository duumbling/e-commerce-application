import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { useAppDispatch } from "../../../shared/model/hooks";
import { filterSlice } from "../model/slice";

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

export function ProductsFilter() {
  const { updateEnumFilters: updateFIlterAttributes } = filterSlice.actions;

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
                dispatch(
                  updateFIlterAttributes({ name: "brand", data: brand }),
                );
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
                dispatch(
                  updateFIlterAttributes({ name: "color", data: value }),
                );
              }}
            />
          ))}
        </Stack>
      </Box>
      {/* <Box>
        <Typography>Размер</Typography>
        <Stack>
          {sizes.map((value) => (
            <Checkbox
              key={value}
              label={value}
              onChange={() => {
                dispatch(updateFIlterAttributes(value));
              }}
            />
          ))}
        </Stack>
      </Box> */}
    </Box>
  );
}
