import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../shared/model/hooks";
import { FilterSectionBox } from "./FilterBox/FilterSectionBox";
import { PriceSlider } from "./PriceSlider/PriceSlider";
// import { rootStyle } from "./style";

export function FilterContent() {
  const { availableFilterValues } = useAppSelector(
    (state) => state.productsFilterReducer,
  );

  return (
    <Box>
      <FilterSectionBox
        title="Бренд"
        values={availableFilterValues.brands}
        enumValuesName="brand"
      />
      <FilterSectionBox
        title="Цвет"
        values={availableFilterValues.colors}
        enumValuesName="color"
      />
      <FilterSectionBox title="Размер" values={availableFilterValues.sizes} />
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
