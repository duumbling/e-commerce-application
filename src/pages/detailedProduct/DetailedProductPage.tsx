import React from "react";
import { FavoriteButton } from "../../shared/ui/FavoriteButton";
import { CustomButton } from "../../shared/ui/CustomButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ThemeColors } from "../../shared/constants/colors";
import { PriceTag } from "../../shared/ui/PriceTag";
import { ProductImageSlider } from "../../entities/product-image-slider";
import { useFetchProduct } from "./model/hooks";

export function DetailedProductPage() {
  const { product } = useFetchProduct();
  return (
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
            />
          </Stack>
          <Stack>
            <div>
              Цвет:{" "}
              <RadioGroup name="product-color" row>
                {colors.map((color) => {
                  return (
                    <FormControlLabel
                      key={color}
                      value={color}
                      label={""}
                      control={
                        <Radio
                          sx={{
                            outline: `solid .1rem #888`,
                            outlineOffset: "-0.5rem",
                            color,
                            "&.Mui-checked": {
                              color,
                            },
                          }}
                        />
                      }
                    />
                  );
                })}
              </RadioGroup>
            </div>
            <div>
              <p>Размер:</p>
              <RadioGroup name="product-size" row>
                {sizes.map((size) => {
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
              <Stack gap={1} useFlexGap>
                <Typography>Артикул: 00000</Typography>
                <Typography>Коллекция: Лето 2022-2023</Typography>
                <Typography>
                  Состав: Верх: 100% Полиуретан; Подкладка: 100% Полиэстер; Низ:
                  100% Термопластичная резина
                </Typography>
                <Typography>Пол: Мужской</Typography>
              </Stack>
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
  );
}
