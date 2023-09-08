import React, { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import {
  CustomButton,
  type CustomButtonProps,
} from "../../../shared/ui/CustomButton";
import { removeAllCartProducts } from "../../../entities/cart";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";

export function CartClearButton({ onClick, ...otherProps }: CustomButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

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
      try {
        /* TODO: 08.09.23 прикрутить обновление стейта корзины,
        когда будут готовы необходимые данные в стейте cartReducer
        */
        await removeAllCartProducts();
        setIsMessageVisible(true);
      } catch {
        // do nothing;
      }
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
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity="success"
        autoHideDuration={500}
        open={isMessageVisible}
        onClose={() => {
          setIsMessageVisible(false);
        }}
        message="Все товары удалены"
      />
    </>
  );
}
