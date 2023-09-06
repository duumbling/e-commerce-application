import React from "react";
import {
  Grid,
  type GridProps,
  type TypographyProps,
  Typography,
} from "@mui/material";

type OrderSummaryItemProps = GridProps & {
  title: string;
  value: number;
  typographyProps?: TypographyProps;
};

export function OrderSummaryItem({
  title,
  value,
  typographyProps,
  ...gridProps
}: OrderSummaryItemProps) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...gridProps}
    >
      <Grid item>
        <Typography {...typographyProps}>{title}</Typography>
      </Grid>
      <Grid item>
        <Typography {...typographyProps}>{value}р</Typography>
      </Grid>
    </Grid>
  );
}
