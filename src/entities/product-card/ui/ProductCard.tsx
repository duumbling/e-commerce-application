import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import {
  rootStyle,
  titleStyle,
  priceStyle,
  imageStyle,
  priceWithDiscountStyle,
  cardActionsStyle,
} from "./style";
import { ThemeColors } from "../../../shared/constants/colors";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
}

export const ProductCard = ({
  image,
  title,
  price,
  discountPrice,
}: ProductCardProps) => {
  return (
    <Card sx={rootStyle}>
      <CardActionArea sx={cardActionsStyle}>
        <CardMedia
          component="img"
          image={image}
          alt={`${title} image`}
          sx={imageStyle}
        />
        <CardContent>
          {discountPrice !== undefined ? (
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item marginLeft={2}>
                <Typography variant="h4" component="div" sx={priceStyle}>
                  {discountPrice} Р
                </Typography>
              </Grid>
              <Grid item marginRight={8}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={priceWithDiscountStyle}
                  color={ThemeColors.GREY}
                >
                  {price} Р
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h4" component="div" sx={priceStyle}>
              {price} Р
            </Typography>
          )}

          <Typography sx={titleStyle} color={ThemeColors.BLACK}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
