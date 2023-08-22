import React, { Children } from "react";
import { Grid, type BoxProps } from "@mui/material";
import { gridContainerProps, gridHeaderProps, gridItemProps } from "./style";

type AuthLayoutProps = Pick<BoxProps, "children">;
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const arrayChildren = Children.toArray(children);
  return (
    <Grid {...gridContainerProps}>
      {arrayChildren.map((child, index) => (
        <Grid
          key={index}
          {...(index > 0 ? gridItemProps : gridHeaderProps)}
          {...gridItemProps}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
