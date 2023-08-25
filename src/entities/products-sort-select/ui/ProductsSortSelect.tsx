import React, { useState } from "react";
import {
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { type SortValue } from "../model/types";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { sortProductsSlice } from "../model/slice";
import { rootStyle, selectItemStyle } from "./style";
import CheckIcon from "@mui/icons-material/Check";
import { SelectItems } from "../model/select-items";

export function ProductsSortSelect() {
  const [currentSelectedItemIndex, setCurrentSelectedItemIndex] = useState(0);

  const sortState = useAppSelector((state) => state.sortProductsReducer);

  const dispatch = useAppDispatch();

  const { setSortOptionValue } = sortProductsSlice.actions;

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentSelectedItemIndex(
      SelectItems[event.target.value as SortValue].index,
    );
    dispatch(setSortOptionValue(event.target.value));
  };

  return (
    <Select
      id="sort-select"
      value={sortState.value}
      onChange={handleChange}
      renderValue={(selected) => SelectItems[selected].label}
      sx={rootStyle}
    >
      {Object.entries(SelectItems).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          <ListItemText
            sx={selectItemStyle}
            primaryTypographyProps={{ sx: selectItemStyle }}
          >
            {value.label}
          </ListItemText>
          {currentSelectedItemIndex === value.index && <CheckIcon />}
        </MenuItem>
      ))}
    </Select>
  );
}
