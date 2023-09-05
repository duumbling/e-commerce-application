import { Grid } from "@mui/material";
import React from "react";
import { typeStyle } from "./style";

export interface AdressTypeItemProps {
  type: string;
}

export function AdressTypeItem({ type }: AdressTypeItemProps) {
  return <Grid {...typeStyle}>{type}</Grid>;
}
