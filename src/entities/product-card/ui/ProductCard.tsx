import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { CustomButton } from "../../../shared/ui/CustomButton";
import {
  buttonContainer,
  buttonStyle,
  contentStyle,
  descriptionStyle,
  priceStyle,
  rootStyle,
  titleStyle,
} from "./style";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export const ProductCard = ({
  image,
  title,
  description,
  price,
}: ProductCardProps) => {
  return (
    <Card sx={rootStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={190}
          image={image}
          alt={`${title} image`}
        />
        <CardContent sx={contentStyle}>
          <Typography component="h4" sx={titleStyle}>
            {title}
          </Typography>
          <Typography component="p" sx={descriptionStyle}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Grid {...buttonContainer}>
        <Grid item>
          <Typography variant="h4" component="div" sx={priceStyle}>
            от {price} Р
          </Typography>
        </Grid>
        <Grid item>
          <CardActions>
            <CustomButton sx={buttonStyle}>В корзину</CustomButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
