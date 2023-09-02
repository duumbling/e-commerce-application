import React, { useState } from "react";
import {
  List,
  Collapse,
  Grid,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { type AttributePlainEnumValue } from "@commercetools/platform-sdk";
import { type FilterParamNames } from "../../../model/types";
import { isPlainEnumValue } from "../../../lib/helpers";
import { FilterCheckbox } from "./FilterCheckbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface FilterSectionBoxProps {
  title: "Бренд" | "Размер" | "Цвет";
  filterName: FilterParamNames;
  values: AttributePlainEnumValue[] | number[];
}

export function FilterSectionBox({
  title,
  values,
  filterName,
}: FilterSectionBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandButtonClick = () => {
    setIsExpanded((state) => !state);
  };

  return (
    <List disablePadding>
      <ListItemButton onClick={handleExpandButtonClick}>
        <ListItemText primary={title} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Grid container justifyContent="center">
          {values.map((value) => (
            <Grid
              item
              key={isPlainEnumValue(value) ? value.key : value}
              md={12}
            >
              <FilterCheckbox
                filterName={filterName}
                label={isPlainEnumValue(value) ? value.label : value}
                value={value}
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </List>
  );
}
