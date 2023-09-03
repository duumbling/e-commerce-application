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

export function DetailedProductPage() {
  return (
    <Grid container spacing={2} m={2} component={"main"}>
      <Grid item xs={12} md={6}>
        Слайдер
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack divider={<Divider />} gap={2} useFlexGap>
          <Stack>
            <Typography component={"h2"} variant="h5">
              Название продукта{" "}
              <Typography component={"span"} color={ThemeColors.GREY}>
                Артикул
              </Typography>
            </Typography>
            <Typography variant="h4" fontWeight={"bold"}>
              9999 Р
            </Typography>
          </Stack>
          <Stack>
            <div>
              Цвет:{" "}
              <RadioGroup name="product-color" row>
                {["#ffffff", "#000000", "#ff00ff"].map((color) => {
                  return (
                    <FormControlLabel
                      key={color}
                      value={color}
                      label={""}
                      control={
                        <Radio
                          sx={{
                            outline: `solid .1rem #888`,
                            outlineOffset: "-.5rem",
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
                {[38, 40, 41].map((size) => {
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
