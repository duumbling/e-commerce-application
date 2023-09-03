import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../../shared/model/hooks";
import { FilterSectionBox } from "./FilterBox/FilterSectionBox";
import { FilterParamNames } from "../../model/types";
import { PriceFilterBox } from "./PriceFilterBox/PriceFilterBox";

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
          <PriceFilterBox />
        </Box>
      )}
    </Box>
  );
}
