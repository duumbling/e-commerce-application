import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { containerProps, rootProps, textStyle } from "./style";

export function BonusesList() {
  return (
    <Box {...rootProps}>
      <Grid
        {...containerProps}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" component="p" sx={textStyle}>
          Мои бонусы
        </Typography>
      </Grid>
    </Box>
  );
}
