import React, { useEffect, useState } from "react";
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
import { PAGE_LIMIT, useFetchProducts } from "../model/hooks";
import { useAppDispatch, useAppSelector } from "../../../shared/model/hooks";
import { updateAvailableFilterValues } from "../../../entities/products-filter";
import {
  getAvailableBrands,
  getAvailableColors,
  getAvailableSizes,
  getMinAndMaxPrices,
} from "../lib/helpers";
import { CustomSnackBar } from "../../../shared/ui/CustomSnackBar";
import { PRIMARY_COLOR, ThemeColors } from "../../../shared/constants/colors";

type ProductsCardsViewProps = Pick<GridProps, "sx">;

export function ProductCardsView({ sx }: ProductsCardsViewProps) {
  const { isFetching, data, pagesCount, error } = useFetchProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    setOffset((value - 1) * PAGE_LIMIT);
  };

  const { isUpdated } = useAppSelector((state) => state.categoriesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFetching) {
      return;
    }

    setCurrentPage(1);
    setOffset(0);

    if (isUpdated) {
      dispatch(
        updateAvailableFilterValues({
          brands: getAvailableBrands(data),
          colors: getAvailableColors(data),
          sizes: getAvailableSizes(data),
          prices: getMinAndMaxPrices(data),
        }),
      );
    }
  }, [isFetching]);

  return (
    <React.Fragment>
      {data.length === 0 && !isFetching ? (
        <Typography variant="h4" color="primary" textAlign="center">
          Ничего не найдено{" "}
        </Typography>
      ) : (
        <>
          <Grid {...productsContainerProps} sx={sx}>
            {data.slice(offset, offset + PAGE_LIMIT).map((product) => {
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
