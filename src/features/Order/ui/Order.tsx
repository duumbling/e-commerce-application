import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { buttonStyle, priceProps, rootStyle, titleProps } from "./style";

export function Order() {
  return (
    <Paper variant="outlined" sx={rootStyle}>
      <Stack spacing={2}>
        <Typography {...titleProps}>Заказ</Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography {...priceProps}>2 товара на сумму</Typography>
          </Grid>
          <Grid item>
            <Typography {...priceProps}>13918р</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography {...priceProps}>Скидка</Typography>
          </Grid>
          <Grid item>
            <Typography {...priceProps}>0р</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          marginTop={3}
        >
          <Grid item>
            <Typography {...titleProps}>ИТОГО:</Typography>
          </Grid>
          <Grid item>
            <Typography {...titleProps}>13918р</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Grid container justifyContent="center" marginTop={5}>
        <Grid item>
          <CustomButton sx={buttonStyle}>Оформить</CustomButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
