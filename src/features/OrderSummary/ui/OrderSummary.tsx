import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { buttonStyle, priceProps, rootStyle, titleProps } from "./style";
import { OrderSummaryItem } from "./OrderSummaryItem/OrderSummaryItem";

export function OrderSummary() {
  return (
    <Paper variant="outlined" sx={rootStyle}>
      <Stack spacing={2}>
        <Typography {...titleProps}>Заказ</Typography>
        <OrderSummaryItem
          title="2 товара на сумму"
          value={13918}
          typographyProps={priceProps}
        />
        <OrderSummaryItem
          title="Скидка"
          value={0}
          typographyProps={priceProps}
        />
        <Divider />
        <OrderSummaryItem
          title="ИТОГО:"
          value={13918}
          typographyProps={titleProps}
          marginTop={3}
        />
      </Stack>
      <Grid container justifyContent="center" marginTop={5}>
        <Grid item>
          <CustomButton sx={buttonStyle}>Оформить</CustomButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
