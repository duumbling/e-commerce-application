import React from "react";
import { FavoriteButton } from "../../shared/ui/FavoriteButton";
import { CustomButton } from "../../shared/ui/CustomButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ThemeColors } from "../../shared/constants/colors";
import { PriceTag } from "../../shared/ui/PriceTag";
import { ProductImageSlider } from "../../entities/product-image-slider";
import { radioStyle } from "./style";
import { useFetchProduct } from "./model/hooks";
import { Header } from "../../widgets/Header";

export function DetailedProductPage() {
  const { product, isFetching, currentVariant, setCurrentVariant } =
    useFetchProduct();

  return (
    <Box>
      <Header />
      <Grid container spacing={2} m={2} component={"main"}>
        <Grid item xs={12} md={6}>
          <ProductImageSlider imageUrls={product?.images} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack divider={<Divider />} gap={2} useFlexGap>
            <Stack>
              <Typography component={"h2"} variant="h5">
                {product?.title}{" "}
                <Typography component={"span"} color={ThemeColors.GREY}>
                  Артикул
                </Typography>
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
                <RadioGroup name="product-size" row>
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
            <CustomButton>В корзину</CustomButton>
            <FavoriteButton />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
