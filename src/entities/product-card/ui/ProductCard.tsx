import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Collapse,
  ButtonGroup,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { rootStyle, titleStyle, imageStyle, cardActionsStyle } from "./style";
import { ThemeColors } from "../../../shared/constants/colors";
import { Paths } from "../../../shared/constants/paths";
import { Link } from "../../../shared/ui/Link";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { useCart } from "../../cart";
import type { ProductVariant } from "../../../shared/types/product";
import { useNavigate } from "react-router-dom";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { PriceTag } from "../../../shared/ui/PriceTag";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  variant: ProductVariant;
  price: number;
  discountPrice?: number;
}

export const ProductCard = ({
  id,
  variant,
  image,
  title,
  price,
  discountPrice,
}: ProductCardProps) => {
  const { isProductAdded, addProduct, isLoading } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSize, setCurrentSize] = useState(0);
  const [isAdded, setIsAdded] = useState(isProductAdded(id));
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAdded) {
      navigate(Paths.Cart);
    } else {
      void (async () => {
        await addProduct(id, variant.id, {
          color: variant.attributes.color.label,
          size: currentSize,
        });
        setIsAdded(true);
        setIsMessageVisible(true);
      })();
    }
  };

  return (
    <Card
      sx={rootStyle}
      onMouseEnter={() => {
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
      }}
    >
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
            <PriceTag price={price} discountPrice={discountPrice} />

            <Typography sx={titleStyle} color={ThemeColors.BLACK}>
              {title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <Collapse in={isExpanded} unmountOnExit>
        {!isAdded && (
          <Grid container justifyContent="center">
            <Grid item>
              <ButtonGroup size="small">
                {variant.attributes.sizes.label.map((size) => (
                  <CustomButton
                    key={size}
                    variant="text"
                    onClick={() => {
                      setCurrentSize(size);
                    }}
                    sx={{
                      color:
                        size === currentSize
                          ? ThemeColors.PRIMARY
                          : ThemeColors.BLACK,
                    }}
                  >
                    {size}
                  </CustomButton>
                ))}
              </ButtonGroup>
            </Grid>
          </Grid>
        )}
        <Grid container justifyContent="center" marginTop={2} marginBottom={2}>
          <Grid item>
            <CustomButton
              disabled={!isAdded && currentSize === 0}
              onClick={handleButtonClick}
            >
              {isAdded ? "Перейти в корзину" : "Добавить в корзину"}
            </CustomButton>
          </Grid>
        </Grid>
      </Collapse>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color={ThemeColors.PRIMARY} />
      </Backdrop>
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity="success"
        autoHideDuration={500}
        open={isMessageVisible}
        onClose={() => {
          setIsMessageVisible(false);
        }}
        message={"Товар добавлен в корзину"}
      />
    </Card>
  );
};
