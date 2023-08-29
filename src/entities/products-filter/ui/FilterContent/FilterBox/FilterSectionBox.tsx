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
import { useCustomSearchParams } from "../../../../../shared/model/hooks";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../../../shared/constants/paths";
import { type FilterParamNames } from "../../../model/types";

type FilterSectionBoxProps = BoxProps & {
  title: "Бренд" | "Размер" | "Цвет";
  filterName: FilterParamNames;
  values: AttributePlainEnumValue[] | number[];
};

const isPlainEnumValue = (
  value: AttributePlainEnumValue | number,
): value is AttributePlainEnumValue => typeof value !== "number";

export function FilterSectionBox({
  title,
  values,
  filterName,
  ...otherProps
}: FilterSectionBoxProps) {
  const tabletMedia = useMediaQuery("(max-width: 998px)");

  const { searchParams, deleteValue } = useCustomSearchParams();

  const navigate = useNavigate();

  const handleChange = (
    checked: boolean,
    value: AttributePlainEnumValue | number,
  ): void => {
    const currentValue =
      typeof value === "number" ? value.toString() : value.key;
    if (checked) {
      searchParams.append(filterName, currentValue);
    } else {
      deleteValue(filterName, currentValue);
    }
    navigate({
      pathname: Paths.Catalog,
      search: searchParams.toString(),
    });
  };

  return (
    <React.Fragment>
      {values.length > 0 && (
        <Box {...otherProps}>
          <Typography>{title}</Typography>
          <Stack direction={tabletMedia ? "row" : "column"} flexWrap="wrap">
            {values.map((value) => (
              <Checkbox
                key={isPlainEnumValue(value) ? value.key : value}
                label={isPlainEnumValue(value) ? value.label : value}
                onChange={(_, checked) => {
                  handleChange(checked, value);
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </React.Fragment>
  );
}
