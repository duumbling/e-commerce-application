import React, { useState } from "react";
import { Slider, type SliderProps } from "@mui/material";
import { filterSlice } from "../../model/slice";
import { useAppDispatch } from "../../../../shared/model/hooks";

const PRICE_MIN_DISTANCE = 100;

export function PriceSlider({ min, max, ...otherProps }: SliderProps) {
  const { updatePriceFilter } = filterSlice.actions;

  const dispatch = useAppDispatch();

  const [priceValue, setPriceValue] = useState<number[]>([min ?? 0, max ?? 0]);

  const handlePriceChange = (
    _: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let minValue = 0;
    let maxValue = 0;

    if (activeThumb === 0) {
      minValue = Math.min(newValue[0], priceValue[1] - PRICE_MIN_DISTANCE);
      maxValue = priceValue[1];
    } else {
      minValue = priceValue[0];
      maxValue = Math.max(newValue[1], priceValue[0] + PRICE_MIN_DISTANCE);
    }
    setPriceValue([minValue, maxValue]);
  };

  return (
    <Slider
      color="primary"
      min={min}
      max={max}
      valueLabelDisplay="auto"
      step={100}
      value={priceValue}
      onChange={handlePriceChange}
      onChangeCommitted={(_, newValue) => {
        if (!Array.isArray(newValue)) {
          return;
        }
        dispatch(updatePriceFilter({ min: newValue[0], max: newValue[1] }));
      }}
      sx={{
        marginLeft: 3,
      }}
      {...otherProps}
    />
  );
}
