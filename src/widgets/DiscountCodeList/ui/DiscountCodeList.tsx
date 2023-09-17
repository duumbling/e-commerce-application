import React from "react";
import { Skeleton, Stack } from "@mui/material";
import { DiscountCodeCard } from "../../../shared/ui/DiscountCodeCard";
import { listStyleProps, skeletonStyleProps } from "./style";
import { useFetchDiscountCodes } from "../model/hooks";

export function DiscountCodeList() {
  const { discountCodes } = useFetchDiscountCodes();

  return discountCodes !== undefined ? (
    <Stack {...listStyleProps}>
      {discountCodes.map((code) => (
        <DiscountCodeCard key={code.code} code={code.code} />
      ))}
    </Stack>
  ) : (
    <Skeleton {...skeletonStyleProps} />
  );
}
