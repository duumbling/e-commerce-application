import React from "react";
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { buttonStyle, priceProps, rootStyle, titleProps } from "./style";
import { OrderSummaryItem } from "./OrderSummaryItem/OrderSummaryItem";
import { useAppSelector } from "../../../shared/model/hooks";

export function OrderSummary() {
  const cartState = useAppSelector((state) => state.cartReducer);

  return (
    <Paper variant="outlined" sx={rootStyle}>
      <Stack spacing={2}>
        <Typography {...titleProps}>Заказ</Typography>
        <OrderSummaryItem
          title={`${cartState.itemsCount} товаров на сумму`}
          value={cartState.totalPrice}
          typographyProps={priceProps}
        />
        <OrderSummaryItem
          title="Скидка"
          value={cartState.totalPrice - cartState.discountPrice}
          typographyProps={priceProps}
        />
        <Divider />
        <OrderSummaryItem
          title="ИТОГО:"
          value={cartState.discountPrice}
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
