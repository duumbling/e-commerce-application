import React, { useState } from "react";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {
  CustomButton,
  type CustomButtonProps,
} from "../../../shared/ui/CustomButton";
import { useCart } from "../../../entities/cart";
import { ThemeColors } from "../../../shared/constants/colors";

export function CartClearButton({ onClick, ...otherProps }: CustomButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { removeAllProducts, isLoading } = useCart();

  const openDialog = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsDialogOpen(true);
    if (onClick !== undefined) {
      onClick(event);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const clearCart = () => {
    closeDialog();
    void (async () => {
      await removeAllProducts();
    })();
  };

  return (
    <>
      <CustomButton {...otherProps} onClick={openDialog}>
        Очистить корзину
      </CustomButton>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Удалить все товары из корзины?</DialogTitle>
        <DialogActions>
          <CustomButton variant="outlined" onClick={closeDialog} autoFocus>
            Отменить
          </CustomButton>
          <CustomButton variant="outlined" onClick={clearCart}>
            Подтвердить
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color={ThemeColors.PRIMARY} />
      </Backdrop>
    </>
  );
}
