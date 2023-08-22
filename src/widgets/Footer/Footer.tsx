import React from "react";
import { Grid } from "@mui/material";
import { Logo } from "../../shared/ui/Logo";
export function Footer() {
  return (
    <Grid component={"footer"}>
      <Grid item>
        <Logo />
      </Grid>
    </Grid>
  );
}
