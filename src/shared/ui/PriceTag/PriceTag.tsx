import React from "react";
import { Typography } from "@mui/material";
import { discountStyle, priceStyle } from "./style";

export interface PriceTagProps {
  price: number;
  discountPrice?: number;
  currency?: string;
  divider?: number;
}

export function PriceTag({
  price,
  discountPrice,
  currency = "Р",
  divider = 1,
}: PriceTagProps) {
  const hasDiscount = discountPrice !== undefined;
  const currentPrice = discountPrice ?? price;
  const renderPrice = (price: number) => `${price / divider} ${currency}`;

  return (
    <Typography {...priceStyle}>
      {renderPrice(currentPrice)}{" "}
      <Typography {...discountStyle}>
        {hasDiscount ? renderPrice(price) : ""}
      </Typography>
    </Typography>
  );
}
