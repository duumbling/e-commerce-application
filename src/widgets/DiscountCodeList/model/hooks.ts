import { type DiscountCode } from "@commercetools/platform-sdk";
import { useEffect, useState } from "react";
import { getDiscountCodes } from "../../../shared/api/discountCodes";

export const useFetchDiscountCodes = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>();

  useEffect(() => {
    void (async () => {
      setIsFetching(true);

      try {
        const discountCodesResponse = await getDiscountCodes();
        if (discountCodesResponse === undefined) return;
        setDiscountCodes(discountCodesResponse.body.results);
      } catch (error) {}

      setIsFetching(false);
    })();
  });

  return { isFetching, discountCodes };
};
