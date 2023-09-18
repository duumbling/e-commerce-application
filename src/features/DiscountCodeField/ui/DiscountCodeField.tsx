import React, { useState } from "react";
import { CustomTextField } from "../../../shared/ui/CustomTextField";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
  type GridProps,
} from "@mui/material";
import { CustomButton } from "../../../shared/ui/CustomButton";
import { useCart } from "../../../entities/cart";
import { ThemeColors } from "../../../shared/constants/colors";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";

export function DiscountCodeField(props: GridProps) {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const { isLoading, applyDiscountCode } = useCart();

  const addDiscountCode = () => {
    void (async () => {
      const isCodeApplied = await applyDiscountCode(discountCode);
      setIsSuccess(isCodeApplied);
      setIsMessageVisible(true);
    })();
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent={{ xs: "center", sm: "start" }}
        alignItems="center"
        {...props}
      >
        <Grid item>
          <CustomTextField
            label="Введите промокод"
            value={discountCode}
            onChange={(event) => {
              setDiscountCode(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <CustomButton
            sx={{ fontSize: 16 }}
            disabled={discountCode === "" ?? true}
            onClick={addDiscountCode}
          >
            Применить
          </CustomButton>
        </Grid>
        <Grid item>
          <Typography
            fontSize={{ md: 20, sm: 16 }}
            color={ThemeColors.GREY_LIGHT}
            fontWeight={700}
          >
            (Промокод действует только на товары без скидки)
          </Typography>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color={ThemeColors.PRIMARY} />
      </Backdrop>
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity={isSuccess ? "success" : "error"}
        autoHideDuration={1000}
        open={isMessageVisible}
        onClose={() => {
          setIsMessageVisible(false);
        }}
        message={
          isSuccess
            ? "Промокод применен"
            : "Промокод не действует, повторите еще раз"
        }
      />
    </>
  );
}
