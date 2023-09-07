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
import type { CartItemData } from "../model/types";
import {
  changeLineItemQuantity,
  cartSlice,
  getCurrentLineItem,
  removeLineItemFromCart,
} from "../../../entities/cart";
import { getPriceValue } from "../../../shared/api/product";
import { useAppDispatch } from "../../../shared/model/hooks";

export type CartItemViewProps = PaperProps & {
  itemData: CartItemData;
};

export function CartItemView({
  itemData,
  sx,
  ...paperProps
}: CartItemViewProps) {
  const {
    id,
    title,
    image,
    price,
    discountPrice,
    color,
    size,
    quantity,
    totalPrice,
  } = itemData;

  const [totalPriceValue, setTotalPriceValue] = useState(totalPrice);

  const [counter, setCounter] = useState(quantity);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { updateTotalPrice, updateItemsIds } = cartSlice.actions;

  const dispatch = useAppDispatch();

  const updateItemQuantity = (action: "add" | "remove") => {
    void (async () => {
      setIsButtonDisabled(true);

      const cart = await changeLineItemQuantity(id, action);

      const currentLineItem = getCurrentLineItem(cart.lineItems, id);

      setCounter(currentLineItem.quantity);

      setTotalPriceValue(getPriceValue(currentLineItem.totalPrice));

      const cartTotalPrice = getPriceValue(cart.totalPrice);

      dispatch(updateTotalPrice(cartTotalPrice));

      setIsButtonDisabled(false);
    })();
  };

  const deleteItem = () => {
    void (async () => {
      const cart = await removeLineItemFromCart(id);
      const newIds = cart.lineItems.map((item) => item.productId);
      dispatch(updateItemsIds(newIds));
    })();
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
              disabled={counter === 1 || isButtonDisabled}
              onClick={() => {
                updateItemQuantity("remove");
              }}
              color={ThemeColors.PRIMARY}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            <Typography sx={itemCounterStyle}>{counter}</Typography>
            <IconButton
              size="large"
              onClick={() => {
                updateItemQuantity("add");
              }}
              color={ThemeColors.PRIMARY}
              disabled={isButtonDisabled}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item marginRight={7}>
          <PriceTag price={totalPriceValue} divider={1} />
        </Grid>
      </Grid>

      <IconButton
        size="large"
        sx={deleteIconButtonStyle}
        onClick={deleteItem}
        disabled={isButtonDisabled}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Paper>
  );
}
