import React from "react";
import {
  Box,
  Typography,
  type BoxProps,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Checkbox } from "../../../../../shared/ui/Checkbox";
import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";
import { filterSlice } from "../../../model/slice";
import { useAppDispatch } from "../../../../../shared/model/hooks";

type FilterSectionBoxProps = BoxProps & {
  title: "Бренд" | "Размер" | "Цвет";
  values: AttributePlainEnumValue[] | number[];
  enumValuesName?: "brand" | "color";
};

export function FilterSectionBox({
  title,
  values,
  enumValuesName,
  ...otherProps
}: FilterSectionBoxProps) {
  const { updateEnumFilters, updateSizeFilter } = filterSlice.actions;

  const tabletMedia = useMediaQuery("(max-width: 998px)");

  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      {values.length > 0 && (
        <Box {...otherProps}>
          <Typography>{title}</Typography>
          <Stack direction={tabletMedia ? "row" : "column"} flexWrap="wrap">
            {values.map((value) =>
              typeof value === "number" ? (
                <Checkbox
                  key={value}
                  label={value}
                  onChange={() => {
                    dispatch(updateSizeFilter(value));
                  }}
                />
              ) : (
                <Checkbox
                  key={value.key}
                  label={value.label}
                  onChange={() => {
                    dispatch(
                      updateEnumFilters({
                        name: enumValuesName ?? "brand",
                        data: value,
                      }),
                    );
                  }}
                />
              ),
            )}
          </Stack>
        </Box>
      )}
    </React.Fragment>
  );
}
