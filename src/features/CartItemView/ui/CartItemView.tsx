import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  type PaperProps,
  Stack,
  Typography,
} from "@mui/material";
import { PriceTag } from "../../../shared/ui/PriceTag";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  deleteIconButtonStyle,
  itemAttributeStyle,
  itemCounterStyle,
  titleStyle,
} from "./style";
import { ThemeColors } from "../../../shared/constants/colors";

export type CartItemViewProps = PaperProps & {
  image: string;
  title: string;
  price: number;
  color: string;
  size: number;
  discountPrice?: number;
};

export function CartItemView({
  image,
  title,
  price,
  discountPrice,
  color,
  size,
  sx,
  ...paperProps
}: CartItemViewProps) {
  const [totalPrice, setTotalPrice] = useState(discountPrice ?? price);

  const [counter, setCounter] = useState(1);

  const handleRemoveButtonClick = () => {
    setCounter((counter) => counter - 1);
    setTotalPrice(totalPrice - (discountPrice ?? price));
  };

  const handleAddButtonClick = () => {
    setCounter((counter) => counter + 1);
    setTotalPrice(totalPrice + (discountPrice ?? price));
  };

  return (
    <Paper
      variant="outlined"
      sx={{ position: "relative", ...sx }}
      {...paperProps}
    >
      <Grid container columnSpacing={{ xs: 2 }} marginTop={1}>
        <Grid item>
          <Box
            component="img"
            width={{
              md: 223,
              sm: 190,
              xs: 125,
            }}
            src={image}
            marginLeft={1}
          />
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Typography sx={titleStyle}>{title}</Typography>
            <PriceTag price={price} discountPrice={discountPrice} divider={1} />
            <Typography sx={itemAttributeStyle} color={ThemeColors.GREY}>
              Цвет: {color}
            </Typography>
            <Typography sx={itemAttributeStyle} color={ThemeColors.GREY}>
              Размер: {size}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item marginLeft={{ md: 40, sm: 0 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              size="large"
              disabled={counter === 1}
              onClick={handleRemoveButtonClick}
              color={ThemeColors.PRIMARY}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            <Typography sx={itemCounterStyle}>{counter}</Typography>
            <IconButton size="large" onClick={handleAddButtonClick}>
              <AddCircleOutlineOutlinedIcon color={ThemeColors.PRIMARY} />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item marginRight={7}>
          <PriceTag price={totalPrice} divider={1} />
        </Grid>
      </Grid>

      <IconButton size="large" sx={deleteIconButtonStyle}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Paper>
  );
}
