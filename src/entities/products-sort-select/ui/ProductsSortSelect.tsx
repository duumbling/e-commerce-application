import React, { useState } from "react";
import {
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { type SelectItem } from "../model/types";
import { useCustomSearchParams } from "../../../shared/model/hooks";
import { rootStyle, selectItemStyle } from "./style";
import CheckIcon from "@mui/icons-material/Check";
import { SelectItemKeys, SelectItems } from "../model/select-items";
import { Paths } from "../../../shared/constants/paths";
import { useNavigate } from "react-router-dom";

export function ProductsSortSelect() {
  const [currentSelectedItemIndex, setCurrentSelectedItemIndex] = useState(
    SelectItems.PRICE_ASC.index,
  );
  const [currentValue, setCurrentValue] = useState<SelectItem>(
    SelectItems.PRICE_ASC,
  );

  const { searchParams } = useCustomSearchParams();

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    searchParams.set("sort", event.target.value);
    const value = SelectItemKeys[event.target.value];
    setCurrentSelectedItemIndex(value.index);
    setCurrentValue(value);
    navigate({
      pathname: Paths.Catalog,
      search: searchParams.toString(),
    });
  };

  return (
    <Select
      id="sort-select"
      value={currentValue.value}
      renderValue={(selected) => SelectItemKeys[selected].label}
      onChange={handleChange}
      sx={rootStyle}
    >
      {Object.entries(SelectItems).map(([key, value]) => (
        <MenuItem key={key} value={value.value}>
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
