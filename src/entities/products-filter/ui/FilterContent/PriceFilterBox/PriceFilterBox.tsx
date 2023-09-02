import React, { useState } from "react";
import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCustomSearchParams } from "../../../../../shared/model/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CustomTextField } from "../../../../../shared/ui/CustomTextField";
import { CustomButton } from "../../../../../shared/ui/CustomButton";
import { FilterParamNames } from "../../../model/types";

export function PriceFilterBox() {
  const { searchParams } = useCustomSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const [minPriceValue, setMinPriceValue] = useState("");

  const [maxPriceValue, setMaxPriceValue] = useState("");

  const handleExpandButtonClick = () => {
    setIsExpanded((state) => !state);
  };

  const handleApplyFilterClick = () => {
    const minValue = Number(minPriceValue);
    const maxValue = Number(maxPriceValue);

    if (minValue < 0 || maxValue < 0) {
      return;
    }

    searchParams.delete(FilterParamNames.PRICE_MIN);
    searchParams.delete(FilterParamNames.PRICE_MAX);

    if (minValue !== 0) {
      searchParams.set(FilterParamNames.PRICE_MIN, minValue.toString());
    }

    if (maxValue !== 0) {
      searchParams.set(FilterParamNames.PRICE_MAX, maxValue.toString());
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <List disablePadding>
      <ListItemButton onClick={handleExpandButtonClick}>
        <ListItemText primary="Цена" />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ textAlign: "center" }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} marginTop={1}>
            <CustomTextField
              type="number"
              label="от"
              value={minPriceValue}
              onChange={(event) => {
                setMinPriceValue(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <CustomTextField
              type="number"
              label="до"
              value={maxPriceValue}
              onChange={(event) => {
                setMaxPriceValue(event.target.value);
              }}
            />
          </Grid>
          <Grid item marginTop={1}>
            <CustomButton onClick={handleApplyFilterClick}>
              Применить
            </CustomButton>
          </Grid>
        </Grid>
      </Collapse>
    </List>
  );
}
