import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ProductsSortSelect } from "../../../entities/products-sort-select";
import { ProductsFilter } from "../../../entities/products-filter";
import { ProductCardsView } from "../../../features/ProductCardsView";
import {
  MOBILE_MEDIA,
  TABLET_MEDIA,
} from "../../../shared/constants/mediaQuery";

export function CategoryProductsWidget() {
  return (
    <Grid
      container
      justifyContent={{
        md: "center",
        sm: "space-between",
        xs: "space-between",
      }}
      sx={{ marginTop: 3 }}
    >
      <Grid item xs={12} sm={12} md={8}>
        <Typography
          variant="h3"
          color="primary"
          sx={{
            fontSize: 40,
            [TABLET_MEDIA]: {
              fontSize: 30,
              textAlign: "center",
            },
            [MOBILE_MEDIA]: {
              fontSize: 25,
            },
          }}
        >
          Текущая категория
        </Typography>
      </Grid>
      <Grid item sm={6} md={4} marginTop={{ md: 0, sm: 5, xs: 5 }}>
        <ProductsSortSelect />
      </Grid>
      <Grid item sm={1} md={2} marginTop={{ md: 8, sm: 5, xs: 5 }}>
        <ProductsFilter />
      </Grid>
      <Grid item sm={12} md={10} marginTop={7}>
        <Box maxWidth={784} margin="auto">
          <ProductCardsView />
        </Box>
      </Grid>
    </Grid>
  );
}
