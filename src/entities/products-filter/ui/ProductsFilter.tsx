import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { useAppDispatch } from "../../../shared/model/hooks";
import { filterSlice } from "../model/slice";

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
// const sizes = ["39", "40", "41", "42", "43"];

interface ProductsFilterProps {
  onChange?: () => void;
}

export function ProductsFilter({ onChange }: ProductsFilterProps) {
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
                if (onChange !== undefined) {
                  onChange();
                }
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
                if (onChange !== undefined) {
                  onChange();
                }
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
