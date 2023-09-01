import React from "react";
import {
  Box,
  Typography,
  type BoxProps,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";
import { type FilterParamNames } from "../../../model/types";
import { isPlainEnumValue } from "../../../lib/helpers";
import { FilterCheckbox } from "./FilterCheckbox";

type FilterSectionBoxProps = BoxProps & {
  title: "Бренд" | "Размер" | "Цвет";
  filterName: FilterParamNames;
  values: AttributePlainEnumValue[] | number[];
};

export function FilterSectionBox({
  title,
  values,
  filterName,
  ...otherProps
}: FilterSectionBoxProps) {
  const tabletMedia = useMediaQuery("(max-width: 998px)");

  return (
    <React.Fragment>
      {values.length > 0 && (
        <Box {...otherProps}>
          <Typography>{title}</Typography>
          <Stack direction={tabletMedia ? "row" : "column"} flexWrap="wrap">
            {values.map((value) => (
              <FilterCheckbox
                filterName={filterName}
                key={isPlainEnumValue(value) ? value.key : value}
                label={isPlainEnumValue(value) ? value.label : value}
                value={value}
              />
            ))}
          </Stack>
        </Box>
      )}
    </React.Fragment>
  );
}
