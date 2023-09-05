import { useEffect, useState } from "react";
import type {
  ProductData,
  ProductVariant,
} from "../../../shared/types/product";
import { getProductById, getProductData } from "../../../shared/api/product";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../../shared/constants/paths";
import { initialState } from "./slice";

export const useFetchProduct = () => {
  const navigate = useNavigate();
  const productId = useParams().id;

  const [isFetching, setIsFetching] = useState(true);
  const [product, setProduct] = useState<ProductData>(initialState);

  const [currentVariant, setCurrentVariant] = useState<ProductVariant>();

  useEffect(() => {
    void (async () => {
      if (productId === undefined) return;

      setIsFetching(true);

      try {
        const productResponse = await getProductById(productId);
        if (productResponse === undefined) return;
        setProduct(getProductData(productResponse.body));
      } catch (error) {
        navigate(Paths.NotFound);
      }

      setIsFetching(false);
    })();
  }, [productId]);

  useEffect(() => {
    if (isFetching) return;
    setCurrentVariant(product.allVariants[0]);
  }, [isFetching]);

  return { isFetching, product, currentVariant, setCurrentVariant };
};
