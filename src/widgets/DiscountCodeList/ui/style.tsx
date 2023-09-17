import React from "react";
import { Divider, type SkeletonProps, type StackProps } from "@mui/material";

export const listStyleProps: StackProps = {
  width: "100%",
  direction: "row",
  divider: <Divider orientation="vertical" flexItem />,
  sx: {
    overflowX: "auto",
  },
};

export const skeletonStyleProps: SkeletonProps = {
  variant: "rectangular",
  height: "8.5rem",
};
