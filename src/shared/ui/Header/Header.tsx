import React from "react";
import { Box, type BoxProps } from "@mui/material";
import { Logo } from "../Logo";

type HeaderProps = Pick<BoxProps, "children">;

export function Header({ children }: HeaderProps) {
  return (
    <Box component="header" sx={{ display: "flex", p: ".5rem" }}>
      <Box>
        <Logo />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row-reverse", flex: "1" }}>
        {children}
      </Box>
    </Box>
  );
}
