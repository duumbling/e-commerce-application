import React, { useEffect } from "react";
import {
  type GridProps,
  Grid,
  Backdrop,
  CircularProgress,
  Typography,
  Pagination,
} from "@mui/material";
import { ProductCard } from "../../../entities/product-card";
import { productsContainerProps } from "./style";
import { useFetchProducts } from "../model/hooks";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { PRIMARY_COLOR, ThemeColors } from "../../../shared/constants/colors";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { getProductsByCategoryId } from "../api/products";
import {
  getAvailableBrands,
  getAvailableColors,
  getAvailableSizes,
  getMinAndMaxPrices,
} from "../lib/helpers";
import { updateAvailableFilterValues } from "../../../entities/products-filter";

type ProductsCardsViewProps = Pick<GridProps, "sx">;

export function ProductCardsView({ sx }: ProductsCardsViewProps) {
  const { isFetching, data, setCurrentPage, currentPage, pagesCount, error } =
    useFetchProducts();
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const { currentCategory } = useAppSelector(
    (state) => state.categoriesReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      const products = await getProductsByCategoryId(currentCategory?.id ?? "");
      dispatch(
        updateAvailableFilterValues({
          brands: getAvailableBrands(products),
          colors: getAvailableColors(products),
          sizes: getAvailableSizes(products),
          prices: getMinAndMaxPrices(products),
        }),
      );
    })();
  }, [currentCategory]);

  return (
    <React.Fragment>
      {data.length === 0 && !isFetching ? (
        <Typography variant="h4" color="primary" textAlign="center">
          Ничего не найдено{" "}
        </Typography>
      ) : (
        <>
          <Grid {...productsContainerProps} sx={sx}>
            {data.map((product) => {
              return (
                <Grid key={product.id} item>
                  <ProductCard
                    id={product.id}
                    variant={product.currentVariant}
                    title={product.title}
                    image={product.images[0]}
                    price={product.price}
                    discountPrice={product.discountPrice}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid container justifyContent="center" marginTop={5}>
            <Grid item>
              <Pagination
                count={pagesCount}
                color={ThemeColors.PRIMARY}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Grid>
          </Grid>
        </>
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
