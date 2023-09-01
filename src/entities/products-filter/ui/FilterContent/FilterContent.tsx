import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../shared/model/hooks";
import { FilterSectionBox } from "./FilterBox/FilterSectionBox";
import { PriceSlider } from "./PriceSlider/PriceSlider";
import { FilterParamNames } from "../../model/types";

export function FilterContent() {
  const { brands, colors, sizes, prices } = useAppSelector(
    (state) => state.productsFilterReducer,
  );

  return (
    <Box>
      <FilterSectionBox
        title="Бренд"
        values={brands}
        filterName={FilterParamNames.BRAND}
      />
      <FilterSectionBox
        title="Цвет"
        values={colors}
        filterName={FilterParamNames.COLOR}
      />
      <FilterSectionBox
        title="Размер"
        values={sizes}
        filterName={FilterParamNames.SIZE}
      />
      {prices.min > 0 && (
        <Box>
          <Typography>Цена</Typography>
          <PriceSlider min={prices.min} max={prices.max} />
        </Box>
      )}
    </Box>
  );
}
