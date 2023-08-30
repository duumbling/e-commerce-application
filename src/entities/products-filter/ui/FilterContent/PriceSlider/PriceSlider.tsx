import React, { useState } from "react";
import { Grid, Slider, type SliderProps } from "@mui/material";
import { useCustomSearchParams } from "../../../../../shared/model/hooks";
import { FilterParamNames } from "../../../model/types";
import { ThemeColors } from "../../../../../shared/constants/colors";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../../../shared/constants/paths";

const PRICE_MIN_DISTANCE = 100;

export function PriceSlider({ min, max, ...otherProps }: SliderProps) {
  const { searchParams } = useCustomSearchParams();

  const [priceValue, setPriceValue] = useState<number[]>([min ?? 0, max ?? 0]);

  const navigate = useNavigate();

  const handlePriceChange = (
    _: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceValue([
        Math.min(newValue[0], priceValue[1] - PRICE_MIN_DISTANCE),
        priceValue[1],
      ]);
    } else {
      setPriceValue([
        priceValue[0],
        Math.max(newValue[1], priceValue[0] + PRICE_MIN_DISTANCE),
      ]);
    }
  };

  return (
    <Grid container columnSpacing={3} justifyContent="center">
      <Grid item xs={10} md={12} sm={10}>
        <Slider
          color={ThemeColors.PRIMARY}
          min={min}
          max={max}
          valueLabelDisplay="auto"
          step={100}
          disableSwap
          value={priceValue}
          onChange={handlePriceChange}
          onChangeCommitted={(_, newValue) => {
            if (!Array.isArray(newValue)) {
              return;
            }
            searchParams.set(
              FilterParamNames.PRICE_MIN,
              newValue[0].toString(),
            );
            searchParams.set(
              FilterParamNames.PRICE_MAX,
              newValue[1].toString(),
            );
            navigate({
              pathname: Paths.Catalog,
              search: searchParams.toString(),
            });
          }}
          {...otherProps}
        />
      </Grid>
    </Grid>
  );
}
