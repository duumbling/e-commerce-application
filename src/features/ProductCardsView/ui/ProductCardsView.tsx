import React, { useEffect } from "react";
import {
  type GridProps,
  Grid,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ProductCard } from "../../../entities/product-card";
import { productsContainerProps } from "./style";
import { useFetchProducts } from "../model/hooks";
import { useAppDispatch } from "../../../shared/model/hooks";
import { updateAvailableFilterValues } from "../../../entities/products-filter";
import {
  getAvailableBrands,
  getAvailableColors,
  getAvailableSizes,
  getMinAndMaxPrices,
} from "../lib/helpers";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { PRIMARY_COLOR } from "../../../shared/constants/colors";

type ProductsCardsViewProps = Pick<GridProps, "sx">;

export function ProductCardsView({ sx }: ProductsCardsViewProps) {
  const { isCategoryUpdated, isFetching, data, error } = useFetchProducts();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateAvailableFilterValues({
        brands: getAvailableBrands(data),
        colors: getAvailableColors(data),
        sizes: getAvailableSizes(data),
        prices: getMinAndMaxPrices(data),
      }),
    );
  }, [isCategoryUpdated]);

  return (
    <React.Fragment>
      {data.length === 0 && !isFetching ? (
        <Typography variant="h4" color="primary" textAlign="center">
          Ничего не найдено{" "}
        </Typography>
      ) : (
        <Grid {...productsContainerProps} sx={sx}>
          {data.map((product) => {
            return (
              <Grid key={product.id} item>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  image={product.images[0]}
                  price={product.price}
                  discountPrice={product.discountPrice}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress sx={{ color: PRIMARY_COLOR }} />
      </Backdrop>
      <CustomSnackBar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        severity="error"
        autoHideDuration={2000}
        open={error !== null}
        message={`Ошибка: ${error?.message ?? ""}`}
      />
    </React.Fragment>
  );
}
