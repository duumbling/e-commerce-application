import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Header } from "../../../widgets/Header";
import {
  bannerStyleProps,
  bannerContainerStyleProps,
  titleContainerStyleProps,
  titleStackStyleProps,
  titleTextStyleProps,
  bannerButtonStyleProps,
} from "./style";
import { Link } from "../../../shared/ui/Link";
import { Paths } from "../../../shared/constants/paths";

export function MainPage() {
  return (
    <>
      <Header />
      <main>
        <Box {...bannerContainerStyleProps}>
          <Link href={Paths.Catalog} {...bannerStyleProps}>
            <Box {...titleContainerStyleProps}>
              <Typography variant={"h1"} {...titleTextStyleProps}>
                <Stack {...titleStackStyleProps}>
                  <Box>НОВАЯ</Box> <Box>ОБУВЬ</Box> <Box>НОВЫЙ</Box>{" "}
                  <Box>
                    ТЫ
                    {"_________"}
                  </Box>
                </Stack>
              </Typography>
            </Box>
            <Box {...bannerButtonStyleProps}>КАТАЛОГ</Box>
          </Link>
        </Box>
      </main>
    </>
  );
}
