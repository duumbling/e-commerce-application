import React, { useState } from "react";
import { FavoriteButton } from "../../shared/ui/FavoriteButton";
import { CustomButton } from "../../shared/ui/CustomButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { PriceTag } from "../../shared/ui/PriceTag";
import { ProductImageSlider } from "../../entities/product-image-slider";
import { radioStyle } from "./style";
import { useFetchProduct } from "./model/hooks";
import { Header } from "../../widgets/Header";
import { useCart } from "../../entities/cart";
import { PRIMARY_COLOR } from "../../shared/constants/colors";
import { CustomSnackBar } from "../../shared/ui/CustomSnackBar";

export function DetailedProductPage() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [currentSize, setCurrentSize] = useState(0);
  const { product, isFetching, currentVariant, setCurrentVariant } =
    useFetchProduct();
  const { addProduct, removeProduct, isLoading, isProductAdded } = useCart();
  const [isAdded, setIsAdded] = useState(isProductAdded(product.id));

  const handleCartButtonClick = () => {
    void (async () => {
      try {
        if (!isAdded) {
          await addProduct(product.id, currentVariant?.id ?? 1, {
            color: currentVariant?.attributes.color.label ?? "",
            size: currentSize,
          });
        } else {
          await removeProduct(product.id);
        }
        setIsAdded(!isAdded);
        setIsMessageVisible(true);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <Box>
      <Header />
      <Grid container spacing={2} m={2} component={"main"}>
        <Grid item xs={12} md={6}>
          <ProductImageSlider
            imageUrls={currentVariant?.images?.map(({ url }) => url) ?? []}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack divider={<Divider />} gap={2} useFlexGap>
            <Stack>
              <Typography component={"h2"} variant="h5">
                {product?.title}
              </Typography>
              <PriceTag
                price={product?.price ?? 0}
                discountPrice={product?.discountPrice}
                divider={1}
              />
            </Stack>
            <Stack>
              <div>
                Цвет:{" "}
                <RadioGroup
                  name="product-color"
                  row
                  defaultValue={1}
                  onChange={({ target: { value } }) => {
                    setCurrentVariant(product.allVariants[+value - 1]);
                    setCurrentSize(0);
                  }}
                >
                  {!isFetching &&
                    product.allVariants.map(({ id, attributes }) => {
                      const { key: color, label } = attributes.color;
                      return (
                        <Tooltip title={label} key={color} arrow>
                          <FormControlLabel
                            value={id}
                            label={""}
                            control={<Radio sx={radioStyle(color)} />}
                          />
                        </Tooltip>
                      );
                    })}
                </RadioGroup>
              </div>
              <div>
                <p>Размер:</p>
                <RadioGroup
                  name="product-size"
                  row
                  value={currentSize}
                  onChange={(event) => {
                    setCurrentSize(Number(event.target.value));
                  }}
                >
                  {!isFetching &&
                    currentVariant?.attributes.sizes.label.map((size) => {
                      const sizeString = size.toString();
                      return (
                        <FormControlLabel
                          key={sizeString}
                          value={sizeString}
                          label={sizeString}
                          control={<Radio />}
                        />
                      );
                    })}
                </RadioGroup>
              </div>
            </Stack>
            <Accordion defaultExpanded>
              <AccordionSummary>Описание:</AccordionSummary>
              <AccordionDetails>
                <Typography>{product.description}</Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack justifyContent={"center"} direction={"row"} gap={2} useFlexGap>
            <CustomButton
              onClick={handleCartButtonClick}
              disabled={!isAdded && currentSize === 0}
            >
              {!isAdded ? "Добавить в корзину" : "Удалить из корзины"}
            </CustomButton>
            <FavoriteButton />
          </Stack>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isFetching}
      >
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </Backdrop>
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity="success"
        autoHideDuration={500}
        open={isMessageVisible}
        onClose={() => {
          setIsMessageVisible(false);
        }}
        message={
          isAdded ? "Товар добавлен в корзину" : "Товар удален из корзины"
        }
      />
    </Box>
  );
}
