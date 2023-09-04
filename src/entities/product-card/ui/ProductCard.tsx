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
import { Paths } from "../../../shared/constants/paths";
import { Link } from "../../../shared/ui/Link";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
}

export const ProductCard = ({
  id,
  image,
  title,
  price,
  discountPrice,
}: ProductCardProps) => {
  return (
    <Card sx={rootStyle}>
      <CardActionArea sx={cardActionsStyle}>
        <Link
          href={`${Paths.Product}/${id}`}
          color={ThemeColors.BLACK}
          sx={{
            ":hover": {
              color: ThemeColors.BLACK,
            },
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={`${title} image`}
            sx={imageStyle}
          />
          <CardContent>
            {discountPrice !== undefined ? (
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item marginLeft={2}>
                  <Typography variant="h4" component="div" sx={priceStyle}>
                    {discountPrice} Р
                  </Typography>
                </Grid>
                <Grid item marginRight={6}>
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
        </Link>
      </CardActionArea>
    </Card>
  );
};
