import React from "react";
import { Typography } from "@mui/material";
import { discountStyle, priceStyle } from "./style";

export interface PriceTagProps {
  price: number;
  discountPrice?: number;
  currency?: string;
}

export function PriceTag({
  price,
  discountPrice,
  currency = "Р",
}: PriceTagProps) {
  const hasDiscount = discountPrice !== undefined;
  const currentPrice = discountPrice ?? price;
  const renderPrice = (price: number) => `${price} ${currency}`;

  return (
    <Typography {...priceStyle}>
      {renderPrice(currentPrice)}{" "}
      <Typography {...discountStyle}>
        {hasDiscount ? renderPrice(price) : ""}
      </Typography>
    </Typography>
  );
}
