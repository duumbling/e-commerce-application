import { Grid } from "@mui/material";
import React from "react";
import { AdressTypeItem } from "./AdressTypeItem";
import { containerStyle } from "./style";

export interface AdressTypeContainerProps {
  isBilling?: boolean;
  isShipping?: boolean;
  isBillingDefault?: boolean;
  isShippingDefault?: boolean;
}

export function AdressTypeContainer({
  isBilling = false,
  isShipping = false,
  isBillingDefault = false,
  isShippingDefault = false,
}: AdressTypeContainerProps) {
  return (
    <Grid {...containerStyle}>
      {isBilling ? <AdressTypeItem type="С" /> : null}
      {isShipping ? <AdressTypeItem type="Д" /> : null}
      {isBillingDefault ? <AdressTypeItem type="СУ" /> : null}
      {isShippingDefault ? <AdressTypeItem type="ДУ" /> : null}
    </Grid>
  );
}
