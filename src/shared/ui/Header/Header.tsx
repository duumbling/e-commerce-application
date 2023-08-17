import React from "react";
import { Box, type BoxProps } from "@mui/material";
import { Logo } from "../Logo";

type HeaderProps = Pick<BoxProps, "children" | "sx">;

export function Header({ children, sx }: HeaderProps) {
  return (
    <Box component="header" sx={{ display: "flex", p: ".5rem" }}>
      <Box>
        <Logo />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          flex: "1",
          alignItems: "center",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
